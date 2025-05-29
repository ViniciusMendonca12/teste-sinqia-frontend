// ActionButtons.js
import React from 'react';

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="d-flex gap-2 mt-3">
      <button
        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
        onClick={onEdit}
      >
        <i className="fas fa-edit"></i>
        Editar
      </button>
      <button
        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
        onClick={onDelete}
      >
        <i className="fas fa-trash"></i>
        Deletar
      </button>
    </div>
  );
};

export default ActionButtons;
