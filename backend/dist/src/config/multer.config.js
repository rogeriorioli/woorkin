"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var storageType = {
    local: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: function (req, file, cb) {
            crypto_1.default.randomBytes(16, function (err, hash) {
                //@ts-ignore
                if (err)
                    cb(err);
                var filename = hash.toString('hex') + "-" + file.originalname;
                cb(null, filename);
            });
        }
    }),
    //@ts-ignore
    s3: multer_s3_1.default({
        s3: new aws_sdk_1.default.S3(),
        bucket: 'devrec',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: function (req, file, cb) {
            crypto_1.default.randomBytes(16, function (err, hash) {
                //@ts-ignore
                if (err)
                    cb(err);
                //@ts-ignore  
                file.key = hash.toString('hex') + "-" + file.originalname;
                //@ts-ignore
                cb(null, file.key);
            });
        }
    })
};
module.exports = {
    dest: path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageType['s3'],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
};
