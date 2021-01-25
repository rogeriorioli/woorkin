import styled from 'styled-components';

interface PageHeaderProps {
  background?: string;
  height?: string;
}

const PageHeaderContainer = styled.section<PageHeaderProps>`
  position: relative;
  top: -90px;
  min-height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  background: url(${(props) => props.background});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 8;
  color: white;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default PageHeaderContainer;
