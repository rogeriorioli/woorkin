import React, { useEffect, useState } from 'react';
import { AiFillContacts } from 'react-icons/ai';
import { IoIosMegaphone, IoIosPeople } from 'react-icons/io';
import api from '../../services/api';
import Count from './Count';
import CounterContainer from './styles';

const Counter = (): JSX.Element => {
  const [recruiter, setRecruiter] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    api.get('/counter').then((success) => {
      const { candidates, jobOffers, recruites } = success.data;
      setRecruiter(recruites);
      setJobs(jobOffers);
      setCandidates(candidates);
    });
  }, []);

  console.log(recruiter, jobs, candidates);

  return (
    <CounterContainer>
      <div className="container">
        <div className="row">
          <div className="column">
            <div className="counter-item">
              <AiFillContacts size="80" color="#7fb9ed" />
              <h3>
                {candidates[0] && <Count number={candidates[0].count} />}
                <br />
                devs cadastrados procurando um novo desafio e crescimento{' '}
              </h3>
            </div>
          </div>
          <div className="column">
            <div className="counter-item">
              <IoIosMegaphone size="80" color="#7fb9ed" />
              <h3>
                {jobs[0] && <Count number={jobs[0].count} />}
                <br /> vagas anúnciadas em empresas incríveis para você se
                aplicar{' '}
              </h3>
            </div>
          </div>
          <div className="column">
            <div className="counter-item">
              <IoIosPeople size="80" color="#7fb9ed" />
              <h3>
                {recruiter[0] && <Count number={recruiter[0].count} />} <br />{' '}
                recutradores procurando novos talentos
              </h3>
            </div>
          </div>
        </div>
      </div>
    </CounterContainer>
  );
};

export default Counter;
