import styled from 'styled-components';

const CookiesContainer = styled.div`
  box-sizing: border-box;
  background: #fafafa;
  border-top: 1px solid #a1a2a2;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  button {
    margin: 0 2%;

    background: #000;
    border: none;
    color: white;
  }
`;

export default CookiesContainer;
