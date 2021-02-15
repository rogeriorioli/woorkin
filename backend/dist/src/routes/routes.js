"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var CandidateController_1 = __importDefault(require("../controllers/CandidateController"));
var CandidateLoginController_1 = __importDefault(require("../controllers/CandidateLoginController"));
var CorporateController_1 = __importDefault(require("../controllers/CorporateController"));
var JobController_1 = __importDefault(require("../controllers/JobController"));
var ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
var RecruiterController_1 = __importDefault(require("../controllers/RecruiterController"));
var RecruiterLoginController_1 = __importDefault(require("../controllers/RecruiterLoginController"));
var ResumeController_1 = __importDefault(require("../controllers/ResumeController"));
var multerConfig = require("../config/multer.config");
var AvatarController_1 = __importDefault(require("../controllers/AvatarController"));
var LogoController_1 = __importDefault(require("../controllers/LogoController"));
var RegisterController_1 = __importDefault(require("../controllers/RegisterController"));
var authMiddleware = require('../middleware/Auth');
var routes = express_1.Router();
var recruiterController = new RecruiterController_1.default;
var candidateController = new CandidateController_1.default;
var corporateController = new CorporateController_1.default;
var recruiterLoginController = new RecruiterLoginController_1.default;
var candidateLoginController = new CandidateLoginController_1.default;
var profileController = new ProfileController_1.default;
var jobcontroller = new JobController_1.default;
var resumeController = new ResumeController_1.default;
var avatarController = new AvatarController_1.default;
var logoController = new LogoController_1.default;
var registerController = new RegisterController_1.default;
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
routes.delete('/job/:id', authMiddleware, jobcontroller.delete);
//get 
routes.get('/jobs', authMiddleware, jobcontroller.index);
routes.get('/jobs/:userid', authMiddleware, jobcontroller.indexByCorp);
routes.get('/candidates', authMiddleware, profileController.index);
routes.get('/candidate/:id', authMiddleware, profileController.indexByUser);
routes.get('/resume/:id', authMiddleware, resumeController.indexByUser);
routes.get('/corporates/', authMiddleware, corporateController.index);
routes.get('/corporate/:userid', authMiddleware, corporateController.indexByCorp);
routes.get('/avatar_url/:userid', authMiddleware, avatarController.getImage);
routes.get('/logo_url/:userid', authMiddleware, logoController.getImage);
//put 
routes.put('/candidateprofile/:id', authMiddleware, profileController.update);
//auth
routes.post('/authrecruiter', recruiterLoginController.authenticate);
routes.post('/authcandidate', candidateLoginController.authenticate);
var avatar = multer_1.default(multerConfig);
//get counter registers
routes.get('/counter', registerController.index);
routes.post('/user_avatar', avatar.single('avatar_url'), authMiddleware, avatarController.create);
routes.post('/corp_logo', avatar.single('logo_url'), authMiddleware, logoController.create);
exports.default = routes;
