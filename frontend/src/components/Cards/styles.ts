import styled from 'styled-components';

const CardContainer = styled.div`
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  margin: 20px 0;
  ul {
    li {
      display: inline-block;
      margin: 0 10px;
      a {
        color: #333;
      }
    }
  }
`;

export default CardContainer;
