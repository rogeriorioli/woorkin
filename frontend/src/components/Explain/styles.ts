import styled from 'styled-components';

const SectionExplain = styled.section`
  background: #e6f1fc;
  padding: 50px 0;
  position: relative;
  overflow: hidden;

  &:after {
    position: absolute;
    content: '';
    width: 100%;
    border-radius: 20%;
    height: 160px;
    top: -60px;
    transform: rotate(-2deg);
    left: 0;
    background: #fff;
  }
  &:before {
    position: absolute;
    content: '';
    width: 100%;
    border-radius: 20%;
    height: 160px;
    bottom: -60px;
    transform: rotate(1deg);
    left: 0;
    background: #fff;
  }
  .image-container {
    display: flex;
    justify-content: center;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 50px;
      z-index: 8;
      bottom: 200px;
      left: -50px;
      height: 50px;
      border-radius: 50%;
      background: #3e3e54;
    }
    &:before {
      content: '';
      position: absolute;
      width: 300px;
      z-index: 8;
      bottom: -60px;
      left: -30px;
      height: 300px;
      border-radius: 50%;
      border: 3px solid #4e7ba3;
    }

    img {
      border-radius: 20px;
      position: relative;
      z-index: 9;
    }
    &-2 {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: 50px;
        z-index: 8;
        top: -100px;
        left: initial;
        height: 50px;
        border-radius: 50%;
        background: #3e3e54;
      }
      &:before {
        content: '';
        position: absolute;
        width: 300px;
        z-index: 8;
        top: -60px;
        left: initial;
        right: -50px;
        height: 300px;
        border-radius: 50%;
        border: 3px solid #4e7ba3;
      }
    }
  }
  .content {
    height: 100%;
    display: flex;
    align-items: center;
    &-text {
      .button {
        background: #3e3e54;
        border: none;
      }
    }
  }
`;

export default SectionExplain;
