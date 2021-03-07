import { Router } from 'express';
import multer from 'multer';
import CandidateController from '../controllers/CandidateController';
import CandidateLoginController from '../controllers/CandidateLoginController';
import CorporateController from '../controllers/CorporateController';
import JobController from '../controllers/JobController';
import ProfileController from '../controllers/ProfileController';
import RecruiterController from '../controllers/RecruiterController';
import RecruiterLoginController from '../controllers/RecruiterLoginController';
import ResumeController from '../controllers/ResumeController';
import multerConfig = require('../config/multer.config')
import AvatarController from '../controllers/AvatarController';
import LogoController from '../controllers/LogoController';
import RegisterController from '../controllers/RegisterController';
import SkillController from '../controllers/SkillController';
import ResumeFileController from '../controllers/ResumeFileController';

const authMiddleware = require('../middleware/Auth')

const routes = Router();

const recruiterController = new RecruiterController
const candidateController = new CandidateController
const corporateController = new CorporateController
const recruiterLoginController = new RecruiterLoginController
const candidateLoginController = new CandidateLoginController
const profileController = new ProfileController
const jobcontroller = new JobController
const resumeController = new ResumeController
const avatarController = new AvatarController
const logoController = new LogoController
const registerController = new RegisterController

const skillController = new SkillController

const resumeFileController = new ResumeFileController
//post


routes.post('/recruiter', recruiterController.create);
routes.post('/corpdata', authMiddleware, corporateController.create);
routes.post('/candidate', candidateController.create);
routes.post('/candidateprofile', authMiddleware, profileController.create);
routes.post('/job', authMiddleware, jobcontroller.create);
routes.post('/resume', authMiddleware, resumeController.create);
routes.post('/resume/skills', authMiddleware, skillController.create)




//update


//delete
routes.delete('/recruiter/:id', authMiddleware, recruiterController.delete);
routes.delete('/candidate/:id', authMiddleware, candidateController.delete);
routes.delete('/job/:id', authMiddleware, jobcontroller.delete)

//get 


routes.get('/resume/skills', authMiddleware, skillController.index)
routes.get('/jobs', authMiddleware, jobcontroller.index)
routes.get('/jobs/:userid', authMiddleware, jobcontroller.indexByCorp)
routes.get('/candidates', authMiddleware, profileController.index)
routes.get('/candidate/:id', authMiddleware, profileController.indexByUser)
routes.get('/resume/:id', authMiddleware, resumeController.indexByUser)
routes.get('/corporates/', authMiddleware, corporateController.index)
routes.get('/corporate/:userid', authMiddleware, corporateController.indexByCorp)
routes.get('/avatar_url/:userid', authMiddleware, avatarController.getImage)
routes.get('/logo_url/:userid', authMiddleware, logoController.getImage)


//put 

routes.put('/candidateprofile/:id', authMiddleware, profileController.update)



//auth
routes.post('/authrecruiter', recruiterLoginController.authenticate)
routes.post('/authcandidate', candidateLoginController.authenticate)

const file = multer(multerConfig)

//get counter registers

routes.get('/counter', registerController.index)
routes.get('/user_resume', authMiddleware, resumeFileController.index)

routes.post('/user_avatar', file.single('avatar_url'), authMiddleware, avatarController.create)


routes.post('/user_resume', file.single('resume_url'), authMiddleware, resumeFileController.create)

routes.post('/corp_logo', file.single('logo_url'), authMiddleware, logoController.create)


export default routes






