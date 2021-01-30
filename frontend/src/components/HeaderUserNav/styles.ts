import styled from 'styled-components';

interface MenuProps {
  opacity: number;
  visibility: string;
}

export const HeaderUserContainer = styled.div<MenuProps>`
  display: flex;
  position: relative;
  align-items: center;
  color: #606c76;
  font-size: 14px;
  line-height: 1;

  cursor: pointer;
  img {
    margin-right: 5px;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
  nav {
    width: 100%;
    display: block;
    position: relative;
    padding: 10px 0;
    div {
      float: right;
      display: flex;
      align-items: center;
    }

    position: relative;
    ul {
      box-shadow: 0px 0px 2px #00000036;
      width: 225px;
      background: #fff;
      right: 0;
      top: 100%;
      position: absolute;
      opacity: ${(props) => props.opacity};
      display: ${(props) => props.visibility};
      transition: all 0.5s;
      li {
        padding: 10px;
        border-top: 1px solid #00000036;
        &:first-child {
          border-top: none;
        }
        a {
          color: #606c76;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .logout {
    width: 100%;
    float: none;
    cursor: pointer;
    color: red;

    height: 40px;
    border-top: 1px solid #00000036;
    justify-content: center;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;
