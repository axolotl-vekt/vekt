import React from 'react';

function Modal({ isOpen, onClose, children, onSubmit }) {
  if (!isOpen) return null;
  return (
    <div className="modalContainer">
      {children}
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Modal;
