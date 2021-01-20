import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../../services/api';
import Input from '../Input';
import LoginArea from '../LoginArea';
import { useRouter } from 'next/router';
const OrgLogin: React.FC = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({});
  const [message, setMessage] = useState<string>('');
  const [register, setResgister] = useState<boolean>(false);
  const getInputData = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value
    }));
  };

  const handeleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await api
      .post('authrecruiter', credentials)
      .then((success) => {
        const { permissions } = success.data;
        sessionStorage.setItem('permissions', JSON.stringify(permissions));
        api
          .get(`corporate/${permissions.user}`, {
            headers: {
              Authorization: 'Bearer ' + permissions.token
            }
          })
          .then((success) => {
            const { data } = success;
            console.log(success.data);

            if (data[0] === null) {
              setMessage(
                'por favor complete seu perfil para poder publicar vagas'
              );
              setTimeout(() => {
                router.push('/recruiter');
              }, 3000);
            } else {
              router.push('/devs');
            }
          });
      })
      .catch(function (error) {
        if (error.response) {
          const { err } = error.response.data;
          setMessage(err);
        }
      });
  };

  const handeleRegister = async (e: FormEvent) => {
    e.preventDefault();
    await api
      .post('recruiter', credentials)
      .then((success) => {
        const { data } = success;
        setMessage(data.message);
        setTimeout(() => {
          handeleLogin(e);
        }, 2000);
      })

      .catch(function (error) {
        if (error.response) {
          const { err } = error.response.data;
          setMessage(err);
          setTimeout(() => {
            setMessage('');
          }, 2000);
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setResgister(!register);
  };
  return (
    <LoginArea image="../static/images/bg-recruiter.jpeg">
      <form onSubmit={register ? handeleRegister : handeleLogin}>
        <h1>Sou Recrutador(a)</h1>
        <p>Encontre os melhores talentos </p>
        {register && (
          <Input
            label="username"
            name="username"
            type="text"
            onChange={getInputData}
          />
        )}
        <Input
          label="email"
          name="email"
          type="email"
          onChange={getInputData}
        />
        <Input
          label="password"
          name="password"
          type="password"
          onChange={getInputData}
        />
        <div className="form-footer">
          {register ? (
            ''
          ) : (
            <a
              className="button button-outline"
              href="#"
              onClick={handleRegister}
            >
              Crear Conta
            </a>
          )}
          {!register && (
            <>
              <button className="button" type="submit">
                Entrar
              </button>
            </>
          )}
          {register && (
            <>
              <a href="#" onClick={handleRegister}>
                Já tenho uma conta
              </a>
              <button type="submit">Registra</button>
            </>
          )}
        </div>

        <div>{message}</div>
      </form>
    </LoginArea>
  );
};

export default OrgLogin;
