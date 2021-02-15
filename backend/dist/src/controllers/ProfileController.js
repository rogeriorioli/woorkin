"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var connection_1 = __importDefault(require("../database/connection"));
var ProfileController = /** @class */ (function () {
    function ProfileController() {
    }
    ProfileController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, candidateProfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.headers.authorization;
                        if (!token) {
                            return [2 /*return*/, res.status(400).json({ err: 'Não Permitido ' })];
                        }
                        return [4 /*yield*/, connection_1.default('candidate_profile')
                                .select('*')
                                .orderBy('created_at', 'desc')];
                    case 1:
                        candidateProfile = _a.sent();
                        return [2 /*return*/, res.json(candidateProfile)];
                }
            });
        });
    };
    ProfileController.prototype.indexByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, id, candidate_profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.headers.authorization;
                        id = req.params.id;
                        if (!token) {
                            return [2 /*return*/, res.status(400).json({ err: 'Não Permitido ' })];
                        }
                        return [4 /*yield*/, connection_1.default('candidate_profile')
                                .where('user_id', id)
                                .select('*')
                                .orderBy('created_at', 'desc')
                                .first()];
                    case 1:
                        candidate_profile = _a.sent();
                        return [2 /*return*/, res.json([candidate_profile])];
                }
            });
        });
    };
    ProfileController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user_id, date, candidate, _a, name, born_date, phone, description, website, linkedin, github, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token = req.headers.authorization;
                        user_id = req.headers.userid;
                        date = new Date;
                        return [4 /*yield*/, connection_1.default('candidate_profile')
                                .where('user_id', user_id)
                                .select('user_id')
                                .first()];
                    case 1:
                        candidate = _b.sent();
                        if (candidate) {
                            return [2 /*return*/, res.status(400).json({ err: 'profile já preenchido' })];
                        }
                        _a = req.body, name = _a.name, born_date = _a.born_date, phone = _a.phone, description = _a.description, website = _a.website, linkedin = _a.linkedin, github = _a.github;
                        if (!token) {
                            return [2 /*return*/, res.status(400).json({ err: 'Não Permitido ' })];
                        }
                        return [4 /*yield*/, connection_1.default('candidate')
                                .where('id', user_id)
                                .select('id')
                                .select('first_session')
                                .first()
                                .update({
                                'first_session': date
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, connection_1.default('candidate_profile').insert({
                                id: uuid_1.v4(),
                                user_id: user_id,
                                name: name,
                                born_date: born_date,
                                phone: phone,
                                description: description,
                                website: website,
                                linkedin: linkedin,
                                github: github,
                            })];
                    case 3:
                        id = (_b.sent())[0];
                        return [2 /*return*/, res.json({
                                message: 'dados inseridos com sucesso',
                                data: req.body,
                                user_id: user_id,
                            })];
                }
            });
        });
    };
    ProfileController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, id, _a, name, born_date, phone, description, website, linkedin, github, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token = req.headers.authorization;
                        id = req.headers.userid;
                        _a = req.body, name = _a.name, born_date = _a.born_date, phone = _a.phone, description = _a.description, website = _a.website, linkedin = _a.linkedin, github = _a.github;
                        if (!token) {
                            return [2 /*return*/, res.status(400).json({ err: 'Não Permitido ' })];
                        }
                        return [4 /*yield*/, connection_1.default('candidate_profile')
                                .where('user_id', id)
                                .update({
                                name: name,
                                born_date: born_date,
                                phone: phone,
                                description: description,
                                website: website,
                                linkedin: linkedin,
                                github: github,
                            })];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, res.json({ message: 'Pefil editado com sucesso', })];
                }
            });
        });
    };
    return ProfileController;
}());
exports.default = ProfileController;
