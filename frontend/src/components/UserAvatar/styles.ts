import styled from 'styled-components';

interface AvatarImage {
  background?: string;
  avatar?: string;
}

const AvatarContainer = styled.div<AvatarImage>`
  display: flex;
  justify-content: center;
  width: 300px;
  position: absolute;
  z-index: 9;
  margin: auto;
  left: 0;
  right: 0;
  top: -200px;
  box-shadow: 0px 0px 4px 0px #333;
  border-radius: 50%;
  height: 200px;
  width: 200px;
  background: url(${(props) => props.avatar}) no-repeat;
  background-size: cover;
  .btn-picture {
    position: relative;
    overflow: hidden;
    display: inline-block;
    box-shadow: 0px 0px 4px 0px #333;
    border-radius: 50%;
    height: 200px;
    width: 200px;
    input[type='file'] {
      position: absolute;
      opacity: 0;
      z-index: 0;
      max-width: 100%;
      height: 100%;
      display: block;
      cursor: pointer;
    }
    .btn-file {
      height: 200px;
      width: 200px;
      border-radius: 50%;
      background: url(${(props) => props.background}) no-repeat;
      background-size: cover;
      color: #fff;
      font-size: 16px;
      border: 0;
      cursor: pointer;

      &-icon {
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 50%;
        display: block;
        bottom: -121px;
        position: relative;
        margin: auto;
        line-height: 50px;
        box-shadow: 0px 0px 4px 0px #333;
        transition: all 0.3s;
      }
    }
    &:hover {
      .btn-file-icon {
        bottom: -60px;
      }
    }
  }
`;

export default AvatarContainer;
