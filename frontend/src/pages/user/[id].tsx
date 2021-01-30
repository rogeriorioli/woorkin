import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import UserArea from '../../Layouts/UserArea';
import api from '../../services/api';

const User = ({ id }) => {
  const [profile, setProfile] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);
    const headers = {
      headers: { Authorization: `Bearer ${credentials.token}` }
    };

    api.get(`candidate/${id}`, headers).then((results) => {
      setProfile(results.data);
    });
  }, [id]);
  return (
    <UserArea id={id} name={profile && profile[0]?.name}>
      <div className="row">
        <div className="column">
          <h2>Dashboard</h2>
          <hr />
        </div>
      </div>
    </UserArea>
  );
};

export default User;

User.getInitialProps = ({ query: { id } }) => {
  return { id };
};
