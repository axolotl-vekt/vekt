import React from 'react'

function Modal({ isOpen, onClose, children, onSubmit }) {
  if (!isOpen) return null;
  return (
    <div className='modalContainer'>
    {children}
    <div className='modalBtnContainer'>
      <button onClick={onSubmit} className='modalBtn'>Submit</button>
      <button onClick={onClose} className='modalBtn'>Close</button>
    </div>
    </div>
  )
}

export default Modal
