import styled from 'styled-components';

interface HeightMobile {
  height?: string;
}

export const MenuContainer = styled.div<HeightMobile>`
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin: 20px 0;
  height: ${(props) => (!props.height ? '291px' : props.height + 'px')};
  overflow: hidden;
  position: relative;
  transition: all 0.5s;
  @media screen and (max-width: 768px) {
    margin: 20px 0 0 0;
  }
  .welcome {
    padding: 10px;
  }
  nav {
    margin: 10px 0;
    ul {
      list-style: none;
      li {
        padding: 10px;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        border-left: 0;
        border-right: 0;
        margin: 0;
        a {
          color: #666;
          display: flex;
          align-items: center;
          svg {
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

export const OpenMenu = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    margin: 0 0 20px;

    float: right;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 5px 0;
    text-align: center;
    height: 30px;
    width: 30px;
    color: #666;
    display: block;
  }
`;
