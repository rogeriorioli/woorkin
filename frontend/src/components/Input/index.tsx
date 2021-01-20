import React, { InputHTMLAttributes } from 'react';

import InputedStyle from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <InputedStyle>
      <legend>{label}</legend>
      <input {...props} />
    </InputedStyle>
  );
};

export default Input;
