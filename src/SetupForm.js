import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext()

  return <main>
    <section className="quiz quiz-small">
      <form className="setup-form">
        <h2>setup quiz</h2>
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input type="number" id="amount" name="amount" value={quiz.amount} onChange={handleChange} className="form-input" min={1} max={50} autoComplete="off" />
        </div>
        <div className="form-control">
          <label htmlFor="category">category</label>
          <select name="category" id="category" className="form-input" value={quiz.category} onChange={handleChange}>
            <option value="sports">sports</option>
            <option value="politics">politics</option>
            <option value="history">history</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">difficulty</label>
          <select name="difficulty" id="difficulty" className="form-input" value={quiz.difficulty} onChange={handleChange}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {error && <p className="error">can't generate questions, please try different options</p>}
        <button type="submit" onClick={handleSubmit} className="submit-btn">start</button>
      </form>
    </section>
  </main>
}

export default SetupForm
