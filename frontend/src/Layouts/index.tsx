import React from 'react';
import CookiesBar from '../components/CookiesBar';
import Logo from '../components/Logo';
import Header from './Header';

// import { Container } from './styles';

const Layouts: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main role="main">{children}</main>
      <footer>
        <CookiesBar />
        footer
      </footer>
    </>
  );
};

export default Layouts;
