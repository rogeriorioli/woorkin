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

//post
routes.post('/recruiter', recruiterController.create);
routes.post('/corpdata', authMiddleware, corporateController.create);
routes.post('/candidate', candidateController.create);
routes.post('/candidateprofile', authMiddleware, profileController.create);
routes.post('/job', authMiddleware, jobcontroller.create);
routes.post('/resume', authMiddleware, resumeController.create);

//update


//delete
routes.delete('/recruiter/:id', authMiddleware, recruiterController.delete);
routes.delete('/candidate/:id', authMiddleware, candidateController.delete);
routes.delete('/job/:id', authMiddleware, jobcontroller.delete)

//get 
routes.get('/jobs', authMiddleware, jobcontroller.index)
routes.get('/jobs/:userid', authMiddleware, jobcontroller.indexByCorp)
routes.get('/candidates', authMiddleware, profileController.index)
routes.get('/candidate/:id', authMiddleware, profileController.indexByUser)
routes.get('/resume/:userid', authMiddleware, resumeController.indexByUser)
routes.get('/corporates/', authMiddleware, corporateController.index)
routes.get('/corporate/:userid', authMiddleware, corporateController.indexByCorp)
routes.get('/avatar_url/:userid', authMiddleware, avatarController.getImage)
routes.get('/logo_url/:userid', authMiddleware, logoController.getImage)

//put 

routes.put('/candidateprofile/:id', authMiddleware, profileController.update)



//auth
routes.post('/authrecruiter', recruiterLoginController.authenticate)
routes.post('/authcandidate', candidateLoginController.authenticate)

const avatar = multer(multerConfig)

//get counter registers

routes.get('/counter', registerController.index)


routes.post('/user_avatar', avatar.single('avatar_url'), authMiddleware, avatarController.create)

routes.post('/corp_logo', avatar.single('logo_url'), authMiddleware, logoController.create)


export default routes






