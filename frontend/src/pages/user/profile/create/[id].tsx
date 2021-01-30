import { profile } from 'console';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Cards from '../../../../components/Cards';
import Notifications from '../../../../components/Notifications';
import UserAvatar from '../../../../components/UserAvatar';
import Layouts from '../../../../Layouts';
import PageHeader from '../../../../Layouts/PageHeader';
import UserArea from '../../../../Layouts/UserArea';
import api from '../../../../services/api';

// import { Container } from './styles';

const create = ({ id }) => {
  const [formProfile, setFormProfile] = useState({});
  const [notification, setNotification] = useState({
    message: '',
    background: 'red',
    then: false
  });
  const [userPermissions, setUserPermissions] = useState({});

  const getFormData = (event: any) => {
    event.persist();
    setFormProfile((formProfile) => ({
      ...formProfile,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);
    setUserPermissions(credentials);
  }, []);
  const SaveProfile = async (event: any) => {
    event.preventDefault();
    await api
      .post(`candidateprofile/`, formProfile, {
        headers: {
          Authorization: 'Bearer ' + userPermissions['token'],
          userid: userPermissions['user']
        }
      })
      .then((success) => {
        const data = success.data;
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
      .catch((error) => {
        const { err } = error.response.data;
        setNotification({
          message: err,
          background: 'red',
          then: true
        });
        setTimeout(() => {
          setNotification({
            message: '',
            background: '',
            then: false
          });
        }, 2000);
      });
  };
  return (
    <UserArea id={id}>
      <div className="row">
        <div className="column">
          <h2>Crie seu Perfil</h2>
          <hr />
        </div>
      </div>
      <form>
        <div className="row">
          <div className="column">
            <label>Nome Completo</label>
            <input
              name="name"
              onChange={getFormData}
              type="text"
              placeholder="Nome Sobrenome"
            />
          </div>
          <div className="column">
            <label>Data de Nascimento</label>
            <input type="date" name="born_date" onChange={getFormData} />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label>Telefone</label>
            <input
              type="tel"
              name="phone"
              placeholder="11-99999-9999"
              onChange={getFormData}
              pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            />
          </div>
          <div className="column">
            <label>Portifolio</label>
            <input
              type="url"
              name="website"
              onChange={getFormData}
              pattern="https://.*"
              placeholder="https://wwww.exemplo.com"
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label>Linked In</label>
            <input
              type="url"
              name="linkedin"
              onChange={getFormData}
              pattern="https://.*"
              placeholder="https://www.linkedin.com/in/seu-linkedin/"
            />
          </div>
          <div className="column">
            <label>Github</label>
            <input
              type="url"
              name="github"
              pattern="https://.*"
              onChange={getFormData}
              placeholder="https://github.com/seu-user"
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label>Uma pequena Introdução</label>
            <textarea
              name="description"
              placeholder="Sou Dev e gosto de ... "
              onChange={getFormData}
              maxLength={400}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <button
              type="submit"
              className="button float-right"
              onClick={SaveProfile}
            >
              Salvar
            </button>
          </div>
        </div>
      </form>

      {notification.then && (
        <Notifications
          message={notification.message}
          background={notification.background}
        />
      )}
    </UserArea>
  );
};

export default create;
create.getInitialProps = ({ query: { id } }) => {
  return { id };
};
