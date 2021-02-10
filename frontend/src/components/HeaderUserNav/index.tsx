import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  CgChevronDown,
  CgChevronUp,
  CgCloseO,
  CgHeart,
  CgLoadbarDoc,
  CgProfile,
  CgSmile
} from 'react-icons/cg';
import { RiUserSearchLine, RiUserStarLine } from 'react-icons/ri';
import api from '../../services/api';
import { HeaderUserContainer } from './styles';

const HeaderUserNav = () => {
  const route = useRouter();
  const [image, setImage] = useState('');
  const [permissions, setPermissions] = useState({});
  const [user, setUser] = useState({
    name: '',
    image: ''
  });
  const [notification, setNotification] = useState({
    message: '',
    background: 'red',
    then: false
  });

  const [toggleMenu, setToggleMenu] = useState({
    opacity: 0,
    visibility: '',
    open: false
  });

  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    if (permissions) {
      const credentials = JSON.parse(permissions);
      setPermissions(credentials);
      const headers = {
        headers: { Authorization: `Bearer ${credentials.token}` }
      };

      if (credentials.user_type === 'candidate') {
        Promise.all([
          api.get(`candidate/${credentials.user}`, headers),
          api.get(`avatar_url/${credentials.user}`, headers)
        ]).then((success) => {
          const candidate = success[0].data;
          console.log(`candidatte`, candidate);
          const avatar = success[1].data;
          console.log(candidate);
          !candidate[0]
            ? setUser({
                name: '',
                image: ''
              })
            : setUser({
                name: candidate[0].name,
                image: !avatar[0]?.avatar_url
                  ? avatar.avatar_url
                  : avatar[0]?.avatar_url
              });
        });
      }
      if (credentials.user_type === 'recruiter') {
        Promise.all([
          api.get(`/corporate/${credentials.user}`, headers),
          api.get(`/logo_url/${credentials.user}`, headers)
        ]).then((success) => {
          const corporate = success[0].data;
          const avatar = success[1].data;
          setUser({
            name: corporate[0].name_company,
            image: !avatar[0]?.logo_url && avatar.logo_url
          });
        });
      }
    }
  }, []);
  const toogleMenu = () => {
    setToggleMenu({
      opacity: !toggleMenu.opacity ? 1 : 0,
      visibility: !toggleMenu.open === false ? 'none' : 'block',
      open: !toggleMenu.open
    });
  };
  const logout = () => {
    sessionStorage.clear();
    setPermissions({});
    route.push('/');
    setUser({ name: '', image: '' });
  };
  return (
    <HeaderUserContainer
      opacity={toggleMenu.opacity}
      visibility={toggleMenu.visibility}
    >
      {!user.image && !user.name ? (
        <nav>
          <div onClick={toogleMenu} className="float-right">
            Login
            {toggleMenu.open === false ? (
              <CgChevronDown size={22} />
            ) : (
              <CgChevronUp size={22} />
            )}
          </div>
          <ul>
            <li>
              <Link href="/register/candidate">
                <a>
                  <RiUserStarLine size={22} /> Sou Candidato
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register/recruiter">
                <a>
                  <RiUserSearchLine size={22} />
                  Sou Recrutador
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <div className="user-image" onClick={toogleMenu}>
            <img src={user.image} alt="{user.name}" />
            {user.name}
            {toggleMenu.open === false ? (
              <CgChevronDown size={22} />
            ) : (
              <CgChevronUp size={22} />
            )}
          </div>
          <ul>
            {permissions['user_type'] === 'candidate' && (
              <>
                <li>
                  <Link href={`/user/${permissions['user']}`}>
                    <a>
                      <CgSmile size={22} /> Minha Area
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/user/profile/${permissions['user']}`}>
                    <a>
                      <CgProfile size={22} /> Editar Perfil
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/user/resume/${permissions['user']}`}>
                    <a>
                      <CgLoadbarDoc size={22} />
                      Editar Curriculum
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/candidate/profile/${permissions['user']}`}>
                    <a>
                      <CgHeart size={22} /> Historico de Aplicações
                    </a>
                  </Link>
                </li>
              </>
            )}
            <div className="logout" onClick={logout}>
              <CgCloseO size={22} />
              SAIR
            </div>
          </ul>
        </nav>
      )}
    </HeaderUserContainer>
  );
};

export default HeaderUserNav;
