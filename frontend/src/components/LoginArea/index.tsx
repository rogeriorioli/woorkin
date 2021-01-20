import React from 'react';
import LoginContainer, { LoginContainerProps } from './styles';

interface Login extends LoginContainerProps {
  image: string;
}

const LoginArea: React.FC<Login> = ({ children, image }) => {
  return <LoginContainer background={image}>{children}</LoginContainer>;
};

export default LoginArea;
