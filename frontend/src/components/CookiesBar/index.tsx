import React, { useEffect, useState } from 'react';

import CookiesContainer from './styles';

const CookiesBar: React.FC = () => {
  const [cookie, setCookie] = useState<boolean>(true);

  useEffect(() => {
    const cookie = document.cookie.match(
      new RegExp('(^| )' + 'accept' + '=([^;]+)')
    );
    cookie && setCookie(false);
  }, []);

  const addCookie = () => {
    document.cookie = 'accept=true';
    setCookie(!cookie);
  };

  return (
    <>
      {cookie && (
        <CookiesContainer>
          <p>
            Esse site utiliza cookies para proporcionar uma experiência
            personalizada na navegação do site.
            <br />
            Ao continuar navegando, você concorda com essas condições.
          </p>
          <button className="button" onClick={addCookie}>
            {' '}
            Entendi e Aceito
          </button>
        </CookiesContainer>
      )}
    </>
  );
};

export default CookiesBar;
