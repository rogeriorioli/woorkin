"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = require('./dblocales');
module.exports = {
    client: 'pg',
    connection: config.development.database,
    migrations: {
        directory: path_1.default.resolve(__dirname, 'src', 'database', 'migrations')
    },
};
console.log(config.development.database);
