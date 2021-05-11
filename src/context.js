import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [correct, setCorrect] = useState(0)
  const [modal, setModal] = useState(false)
  const [error, setError] = useState(false)
  const [index, setIndex] = useState(0)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'medium'
  })

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    try {
      const response = await axios.get(url)
      if (response) {
        const data = response.data.results
        if (data.length > 0) {
          setQuestions(data)
          setWaiting(false)
          setLoading(false)
          setError(false)
        }
      } else {
        setWaiting(true)
        setError(true)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const nextQuestion = () => {
    if (index >= questions.length - 1) {
      openModal()
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }

  const checkAnswer = value => {
    if (value) setCorrect(correct + 1)
    nextQuestion()
  }

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setWaiting(true)
    setCorrect(0)
  }

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const url = `${API_ENDPOINT}amount=${quiz.amount}&difficulty=${quiz.difficulty}&category=${table[quiz.category]}&type=multiple`
    fetchQuestions(url)
  }

  return <AppContext.Provider value={{
    loading,
    waiting,
    error,
    modal,
    index,
    questions,
    correct,
    nextQuestion,
    checkAnswer,
    closeModal,
    quiz,
    handleChange,
    handleSubmit
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
