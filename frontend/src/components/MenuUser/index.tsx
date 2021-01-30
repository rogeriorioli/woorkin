import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  CgChevronDown,
  CgChevronUp,
  CgHeart,
  CgLoadbarDoc,
  CgProfile,
  CgSmile
} from 'react-icons/cg';
import api from '../../services/api';
import { MenuContainer, OpenMenu } from './styles';

interface MenuProps {
  name?: string;
  id?: string;
}

const MenuUser = ({ name, id }: MenuProps) => {
  const [mobile, setMobile] = useState<boolean>(false);

  const route = useRouter();
  const [image, setImage] = useState('');
  const [permissions, setPermissions] = useState({});
  const [user, setUser] = useState<string>('');
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
        api
          .get(`candidate/${credentials.user}`, headers)
          .then((success) => {
            const { data } = success;
            setUser(data[0].name);
          })
          .catch((error) => error);
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMobile(true);
    }
  }, []);

  const openMenu = () => {
    setMobile(!mobile);
  };

  return (
    <>
      <MenuContainer height={!mobile ? 'auto' : '70 '}>
        <div className="welcome">
          Olá, <strong>{!user ? 'candidato' : user} </strong> ! <br /> seja bem
          vindo.
        </div>
        {user && (
          <nav>
            <ul>
              <li>
                <Link href={`/user/${id}`}>
                  <a>
                    <CgSmile size={22} /> Minha Area
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/user/profile/${id}`}>
                  <a>
                    <CgProfile size={22} /> Editar Perfil
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/candidate/profile/${id}`}>
                  <a>
                    <CgLoadbarDoc size={22} />
                    Editar Curriculum
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/candidate/profile/${id}`}>
                  <a>
                    <CgHeart size={22} /> Historico de Aplicações
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </MenuContainer>

      <OpenMenu onClick={openMenu}>
        {mobile ? <CgChevronDown size={22} /> : <CgChevronUp size={22} />}
      </OpenMenu>
    </>
  );
};
export default MenuUser;
