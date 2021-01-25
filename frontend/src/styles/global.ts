import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    *{
      font-family: 'Spinnaker', sans-serif;
      margin : 0;
      padding : 0;
      box-sizing : border-box;
    }
    h1, h2, h3, legend {
       font-family: 'Jura', sans-serif;
    }
    button {
      cursor: pointer;
    }
    ul { list-style :none }
    .button {
      background : #333;
      border : none;
    }
    @media screen and (max-width: 768px) {
      .column-mobile {
        min-width : 100%;
      }
    }
    .main-content {
      margin: 20px 0;
      
    }
`;

export default GlobalStyles;
