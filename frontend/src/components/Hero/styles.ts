import styled from 'styled-components';

const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  .content {
    display: flex;
    height: 100%;
    align-items: center;
    flex-wrap: wrap;
    .button {
      background: #000;
      border: 0;
    }
  }
  .image {
    padding: 60px;
  }
  .slider {
    height: 400px;
    overflow: hidden;
    &-item {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

export default HeroContainer;
