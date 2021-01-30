import React from 'react';
import HeaderUserNav from '../../components/HeaderUserNav';

import HeaderContainer from './styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <div className="container">
        <div className="row flex">
          <div className="column column-20">
            <h2>woorkin</h2>
          </div>
          <div className="column column-60"></div>
          <div className="column column-20">
            <HeaderUserNav />
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
