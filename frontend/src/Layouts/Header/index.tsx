import React from 'react';

import HeaderContainer from './styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <div className="container">
        <div className="row">
          <div className="column column-25">
            <h2>woorkin</h2>
          </div>
          <div className="column">.column</div>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
