import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { modal, closeModal, correct, questions } = useGlobalContext()

  return <div className={`${modal ? 'modal-container isOpen' : 'modal-container'}`}>
    <div className="modal-content">
      <h2>Completed!</h2>
      <p>You answered of {((correct / questions.length) * 100).toFixed(0)}% questions correctly</p>
      <button className="close-btn" onClick={closeModal}>play again</button>
    </div>
  </div>
}

export default Modal
