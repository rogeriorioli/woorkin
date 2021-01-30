import React, { useEffect, useState } from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import api from '../../services/api';
import Notifications from '../Notifications';

import AvatarContainer from './styles';

interface BgAvatar {
  background?: string;
}

const UserAvatar = ({ background }: BgAvatar) => {
  const [image, setImage] = useState('');
  const [userPermissions, setUserPermissions] = useState({});
  const [notification, setNotification] = useState({
    message: '',
    background: 'red',
    then: false
  });
  //.
  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);
    const headers = {
      headers: { Authorization: `Bearer ${credentials.token}` }
    };
    setUserPermissions(JSON.parse(permissions));
    api.get(`candidate/${permissions.user}`, headers).then((success) => {
      const { data } = success;
      if (data[0] !== null) {
        return false;
      } else {
        api.get(`avatar_url/${credentials.user}`, headers).then((response) => {
          const { data } = response;
          if (!data) {
            return false;
          }
          setImage(data[0]?.avatar_url);
        });
      }
    });
  }, []);

  console.log(userPermissions);
  const UploadAvatar = (e) => {
    e.persist();
    const formData = new FormData();
    formData.append('avatar_url', e.target.files[0]);
    api
      .post('/user_avatar', formData, {
        headers: {
          Authorization: `Bearer ${userPermissions['token']}`,
          userid: `${userPermissions['user']}`,
          'content-type': 'multipart/form-data'
        }
      })
      .then((success) => {
        const data = success.data;
        setImage(data['image']);
        setNotification({
          message: data.message,
          background: 'green',
          then: true
        });
        setTimeout(() => {
          setNotification({
            message: '',
            background: '',
            then: false
          });
        }, 2000);
      })
      .catch((error) => console.log(error));
  };
  return (
    <AvatarContainer
      background={!image ? '/static/images/avatar-icon.webp' : image}
    >
      <label className="btn-picture">
        <input type="file" name="avatar_url" onChange={UploadAvatar} />
        <button className="btn-file">
          <span className="btn-file-icon">
            <FaCameraRetro size={20} color="#000" />
          </span>
        </button>
      </label>
      {notification.then && (
        <Notifications
          message={notification.message}
          background={notification.background}
        />
      )}
    </AvatarContainer>
  );
};

export default UserAvatar;
