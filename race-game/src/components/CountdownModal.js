// src/components/CountdownModal.js
import React from 'react';
import './CountdownModal.css';

const CountdownModal = ({ countdown, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>{countdown}</h1>
      </div>
    </div>
  );
};

export default CountdownModal;
