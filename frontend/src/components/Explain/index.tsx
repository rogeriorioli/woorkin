import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import SectionExplain from './styles';

const Explain: React.FC = ({ children }) => {
  return (
    <SectionExplain>
      <div className="container">
        <div className="row">
          <div className="column">
            <div className="image-container">
              <Image src="/static/images/dev.jpeg" width="300" height="500" />
            </div>
          </div>
          <div className="column">
            <div className="content">
              <div className="content-text">
                <h2>Desenvolvedores encontre vagas com seu perfil </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adip</p>
                <Link href="/register/candidate">
                  <a className="button"> Crie sua conta </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="content">
              <div className="content-text">
                <h2>Recrutadores encontre talentos para seu time </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adip</p>
                <Link href="/register/recruiter">
                  <a className="button"> Crie sua conta </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="image-container image-container-2">
              <Image src="/static/images/rec.jpeg" width="300" height="500" />
            </div>
          </div>
        </div>
      </div>
    </SectionExplain>
  );
};

export default Explain;
