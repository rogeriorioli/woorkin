import React, { useEffect, useState } from 'react';
import UserArea from '../../../Layouts/UserArea';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import api from '../../../services/api';
// import { Container } from './styles';

const Resume = ({ id }) => {
  const exemplo = `
<div class="stuff">
  <br><br>
  <h1>Resume</h1>
  <h2>Emily</h2>
  <hr />
  <br>
  <p class="head">Interests</p>
  <ul>
    <li>Drawing</li>
    <li>Photography</li>
    <li>Design</li>
    <li>Programming</li>
    <li>Computer Science</li>
  </ul>
  <p class="head">Skills</p>
  <ul>
    <li>Web Design with HTML & CSS</li>
  </ul>
  <p class="head">Education</p>
  <ul>
    <a href="http://www.wiltonhighschool.org/pages/Wilton_High_School">
      <li>Wilton High School</li>
    </a>
    <!--Link-->
    <a href="https://www.silvermineart.org/">
      <li>Silvermine School of Arts</li>
    </a>
    <li>Codeacademy</li>
  </ul>
  <p class="head">Experience</p>
  <ul>
    <li>Student Technology Intern for Wilton School District</li>
    <li>Babysitter</li>
  </ul>
  <p class="head">Extracurriculars</p>
  <ul>
    <li>Recycling Club</li>
    <li>Gardening Club</li>
    <li>Book Club</li>
  </ul>
</div>
<div class="right"></div>
`;

  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState({});
  const [resume, setResume] = useState('');
  const [Userpermissions, setUserPermissions] = useState({});
  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);
    setUserPermissions(credentials);
  }, []);

  const getSkills = (e) => {
    e.persist();
    setSkills((skills) => [...skills, e.target.value]);
  };
  const gettitle = (e) => {
    e.persist();
    setTitle({ [e.target.name]: e.target.value });
  };

  const getResume = (content) => {
    setResume(content);
  };
  const dataForm = {
    title,
    skills: skills,
    resume: resume
  };
  const sendResume = async (e) => {
    e.preventDefault();
    await api
      .post('resume', dataForm, {
        headers: {
          Authorization: `Bearer ${Userpermissions['token']}`,
          userid: Userpermissions['user']
        }
      })
      .then((sucess) => console.log(sucess))
      .catch((err) => console.error(err));
  };
  console.log(resume);
  return (
    <UserArea id={id}>
      <div className="row">
        <div className="column">
          <h2>Crie ou edite seu Curiculum</h2>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label>Titulo</label>
          <input
            type="text"
            name="title"
            placeholder="Desenvolvedor Full Stack"
            onChange={gettitle}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <SunEditor
            lang="pt_br"
            setOptions={{
              height: 400
            }}
            defaultValue={exemplo}
            onChange={getResume}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <h2>Skills</h2>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div>
            <input type="checkbox" value="Javascript" onChange={getSkills} />
            <label> Javascript</label>
          </div>
          <div>
            <input type="checkbox" value="React" onChange={getSkills} />
            <label>React</label>
          </div>
          <div>
            <input type="checkbox" value="CSS" onChange={getSkills} />
            <label>Css</label>
          </div>
        </div>
      </div>
      <button onClick={sendResume}>enviar resume</button>
    </UserArea>
  );
};

export default Resume;

Resume.getInitialProps = ({ query: { id } }) => {
  return { id };
};
