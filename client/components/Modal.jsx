import React from 'react'


/** 
 * Renders a Modal box that receives props from Homepage component.
 * Modal pops up when clicking the edit button on an test entry
 * ?? not quite sure what {children} is doing
 * */

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
