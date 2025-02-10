import React from "react";
import "@/styles/components/button.styles.scss";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <div className="button-container">
      <button> {text} </button>
    </div>
  );
};

export default Button;
