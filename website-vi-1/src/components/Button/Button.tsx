import React from "react";
import { text } from "stream/consumers";

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
