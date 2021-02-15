"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var config = require('../../dblocales');
var db = knex_1.default({
    client: 'pg',
    version: '13.1',
    connection: config.development.database,
});
exports.default = db;
