import React, { ReactNode, useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import CardContainer from './styles';

interface CardsProps {
  name: string;
  born_date?: Date;
  description?: string;
  created_at?: string;
  github?: string;
  linkedin?: string;
  phone?: string;
  website?: string;
  children?: ReactNode;
}

const Cards = ({
  name,
  born_date,
  description,
  created_at,
  github,
  linkedin,
  phone,
  website,
  children
}: CardsProps) => {
  return (
    <CardContainer>
      <h2>{name}</h2>
      <p>{description}</p>
      <ul>
        {github && (
          <li>
            <a href={github}>
              <FaGithub size={23} />
            </a>
          </li>
        )}
        {linkedin && (
          <li>
            <a href={linkedin}>
              <FaLinkedin size={23} />
            </a>
          </li>
        )}
        {phone && (
          <li>
            <a href={`tel:${phone}`}>
              <FaWhatsapp size={23} />
            </a>
          </li>
        )}
        {website && (
          <li>
            <a href={website}>
              <BiWorld size={23} />
            </a>
          </li>
        )}
      </ul>
    </CardContainer>
  );
};

export default Cards;
