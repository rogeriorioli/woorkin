import styled from 'styled-components';

export interface LoginContainerProps {
  background?: string;
}

const LoginContainer = styled.div<LoginContainerProps>`
  width: 100%;
  background-image: url(${(props) => props.background});
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  flex-wrap: wrap;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  * {
    position: relative;
    z-index: 9999;
  }
  form {
    background: #fff;
    padding: 30px;
    width: 50%;
    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      a {
        color: #000;
      }
      button {
        background: #000;
        color: #fff;
        text-transform: uppercase;
        border: none;
      }
    }
  }
  p {
    margin-bottom: 20px;
  }
`;

export default LoginContainer;
