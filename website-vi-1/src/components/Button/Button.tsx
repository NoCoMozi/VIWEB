import React from "react";
import "@/styles/components/button.styles.scss";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <button className="button"> {text} </button>;
};

export default Button;
