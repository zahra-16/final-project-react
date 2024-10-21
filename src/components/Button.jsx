// src/components/Button.jsx
import React from 'react';

const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`py-2 px-4 rounded-full text-lg font-bold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
