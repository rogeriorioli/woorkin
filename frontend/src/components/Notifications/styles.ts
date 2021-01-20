import styled from 'styled-components';

interface NotificationStyle {
  background?: string;
}

const NotificationContainer = styled.div<NotificationStyle>`
  position: fixed;
  background: ${(props) => props.background};
  padding: 10px;
  box-shadow: 0px 0px 4px 0px #333;
  bottom: 50px;
  color: #fff;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  z-index: 99;
  max-width: 300px;

  opacity: 1;
  transition: background 0.5s;
`;

export default NotificationContainer;
