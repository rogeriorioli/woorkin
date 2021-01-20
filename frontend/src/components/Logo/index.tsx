import React from 'react';
import Link from 'next/link';
// import { Container } from './styles';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a>
        <h1>WOORKIN</h1>
      </a>
    </Link>
  );
};

export default Logo;
