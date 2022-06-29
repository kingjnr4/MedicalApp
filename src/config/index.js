"use strict";
var _a;
exports.__esModule = true;
exports.GOOGLE_REFRESH_TOKEN = exports.GOOGLE_REDIRECT_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.DB_URL = exports.ORIGIN = exports.LOG_DIR = exports.LOG_FORMAT = exports.SECRET_KEY = exports.DB_DATABASE = exports.DB_PORT = exports.DB_HOST = exports.PORT = exports.NODE_ENV = exports.CREDENTIALS = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.CREDENTIALS = process.env.CREDENTIALS === "true";
exports.NODE_ENV = (_a = process.env, _a.NODE_ENV), exports.PORT = _a.PORT, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_DATABASE = _a.DB_DATABASE, exports.SECRET_KEY = _a.SECRET_KEY, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.LOG_DIR = _a.LOG_DIR, exports.ORIGIN = _a.ORIGIN, exports.DB_URL = _a.DB_URL, exports.GOOGLE_CLIENT_ID = _a.GOOGLE_CLIENT_ID, exports.GOOGLE_CLIENT_SECRET = _a.GOOGLE_CLIENT_SECRET, exports.GOOGLE_REDIRECT_URL = _a.GOOGLE_REDIRECT_URL, exports.GOOGLE_REFRESH_TOKEN = _a.GOOGLE_REFRESH_TOKEN;
