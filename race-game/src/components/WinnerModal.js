// src/components/WinnerModal.js
import React from 'react';
import './WinnerModal.css';

const WinnerModal = ({ winner, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¡{winner} ha ganado la carrera!</h2>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default WinnerModal;

