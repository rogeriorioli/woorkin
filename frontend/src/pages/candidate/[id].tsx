import { profile } from 'console';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import UserAvatar from '../../components/UserAvatar';
import Avatar from '../../components/UserAvatar/Avatar';
import Layouts from '../../Layouts';
import PageHeader from '../../Layouts/PageHeader';
import api from '../../services/api';

// import { Container } from './styles';

const Candidate = ({ id }) => {
  const [profile, setProfile] = useState([]);
  const [avatar, setAvatar] = useState({});

  const router = useRouter();
  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);
    const headers = {
      headers: { Authorization: `Bearer ${credentials.token}` }
    };
    Promise.all([
      api.get(`candidate/${id}`, headers),
      api.get(`avatar_url/${id}`, headers)
    ]).then((results) => {
      setProfile(results[0].data);
      setAvatar(results[1].data);
    });
  }, []);

  return (
    <Layouts>
      <PageHeader
        background="../static/images/profile-bg.jpeg"
        title={`${profile[0]?.name}`}
        description={`${profile[0]?.description}`}
      />
      <div className="container">
        <div className="row">
          <div className="column">
            <Avatar background={avatar[0]?.avatar_url} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="column">
            {profile &&
              profile.map((user) => {
                return (
                  <Cards
                    key={user.user_id}
                    name={user.name}
                    description={user.description}
                    website={user.website}
                    linkedin={user.linkedin}
                    github={user.github}
                    phone={user.phone}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Candidate;

Candidate.getInitialProps = ({ query: { id } }) => {
  return { id };
};
