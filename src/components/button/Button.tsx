import React, { FC } from 'react';
import './button.scss';

type ButtonProps = {
  name: string;
  onClick: () => void;
}

const Button:FC<ButtonProps> = ({ onClick, name }) => (
  <div>
    <button onClick={onClick} className="button">
      {name}
    </button>
  </div>
);

export default Button;
