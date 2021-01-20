import styled from 'styled-components';

const InputedStyles = styled.fieldset`
  background: #fff;
  margin: 10px 0;
  padding: 5px;
  legend {
    text-transform: uppercase;
  }
  input {
    width: 100%;
    color: #666;
    border: none;

    &:focus {
      outline: none;
    }
  }
`;

export default InputedStyles;
