// src/components/Button.jsx

const Button = ({ children, className, onClick }) => {
  try {
    return (
      <button
        className={`py-2 px-4 rounded-full text-lg font-bold ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } catch (error) {
    console.log(error);
  }
};

export default Button;
