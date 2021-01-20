import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { v4 } from 'uuid';

import HeroContainer from './styles';

const Hero: React.FC = () => {
  const initialHero = [
    {
      id: v4(),
      title: 'Encontre Talentos para completar seu TeamWork',
      text: 'Faça seu cadastro e começe a Publicar vagas !',
      link: '/register/recruiter',
      image: '/static/images/team_work.svg'
    },
    {
      id: v4(),
      title: 'Encontre um trampo com a nossa ajuda',
      text: 'Faça seu cadastro e começe a Publicar vagas !',
      link: '/register/candidate',
      image: '/static/images/dev.svg'
    }
  ];

  const [slider, setSlider] = useState(initialHero);

  useEffect(() => {
    setTimeout(() => {
      const random = [
        initialHero[Math.floor(Math.random() * initialHero.length)]
      ];
      setSlider(random);
    }, 5000);
  }, [slider]);
  return (
    <HeroContainer>
      <div className="container">
        <div className="slider">
          {slider.map((slider) => {
            return (
              <div className="row slider-item" key={slider.id}>
                <div className="column">
                  <div className="content">
                    <div className="content-text">
                      <h1>{slider.title}</h1>
                      <p>{slider.text}</p>
                      <Link href={slider.link}>
                        <a className="button">quero Cadastrar</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="column image">
                  <Image
                    src={slider.image}
                    width="100%"
                    height="auto"
                    layout="responsive"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </HeroContainer>
  );
};

export default Hero;
