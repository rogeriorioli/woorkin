import React from 'react';
import AvatarContainer from './styles';

// import { Container } from './styles';

interface AvatarProps {
  background: string;
}

const Avatar = ({ background }: AvatarProps) => {
  return (
    <AvatarContainer
      avatar={!background ? '../static/images/avatar-icon.webp' : background}
    />
  );
};

export default Avatar;
