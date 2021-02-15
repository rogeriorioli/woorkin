"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authConfig = require('../config/auth');
module.exports = function (req, res, next) {
    var authKey = authConfig.secretKey;
    var autHeader = req.headers.authorization;
    if (!autHeader)
        return res.status(401).send({ error: 'Unauthorized' });
    var parts = autHeader.split(' ');
    // @ts-ignore
    if (!parts.length === 2)
        return res.status(401).send({ error: 'token error' });
    var scheme = parts[0], token = parts[1];
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'token malformated' });
    // @ts-ignore
    jsonwebtoken_1.default.verify(token, authConfig.secret, function (err, decode) {
        if (err)
            return res.status(401).send({ error: 'token inalid' });
        // @ts-ignore
        req.userId = decode.id;
        return next();
    });
};
