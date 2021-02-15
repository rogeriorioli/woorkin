"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    // Development Environment
    development: {
        database: {
            host: 'localhost',
            user: "docker",
            password: "docker",
            database: "recrurajr",
        }
    },
    // Production Environment
    production: {
        database: {
            host: "" + process.env.DB_HOST,
            user: "" + process.env.DB_USER,
            password: "" + process.env.DB_PASS,
            database: "" + process.env.DB_DATABASE,
        }
    }
};
