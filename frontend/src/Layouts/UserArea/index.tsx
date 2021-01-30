import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import MenuUser from '../../components/MenuUser';
import UserAvatar from '../../components/UserAvatar';
import Layouts from '..';
import PageHeader from '../PageHeader';
import api from '../../services/api';
import candidate from '../../pages/register/candidate';
import Notifications from '../../components/Notifications';

// import { Container } from './styles';

interface UserArea {
  id?: string;
  name?: string;
  children: ReactNode;
}

const UserArea = ({ id, children, name }: UserArea) => {
  const router = useRouter();

  const [userType, setUserType] = useState({
    message: '',
    state: true,
    background: ''
  });

  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);

    if (credentials.user_type !== 'candidate' || credentials.user !== id) {
      setUserType({
        message: 'sem permissão',
        state: false,
        background: 'red'
      });

      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  });
  return (
    <Layouts>
      <PageHeader background="/static/images/dash.jpeg" height={'300'} />
      {userType && (
        <>
          <div className="container">
            <div className="row">
              <div className="column">
                <UserAvatar />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="column column-25 column-mobile">
                {}
                <MenuUser name={userType && name} id={userType && id} />
              </div>
              <div className="column column-75 column-mobile">
                <div className="main-content">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
      {!userType.state && (
        <Notifications
          message={userType.message}
          background={userType.background}
        />
      )}
    </Layouts>
  );
};

export default UserArea;
