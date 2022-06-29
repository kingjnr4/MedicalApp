"use strict";
exports.__esModule = true;
exports.stream = exports.logger = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var winston_1 = require("winston");
var config_1 = require("../config");
// logs dir
var dir = path_1.join(__dirname, config_1.LOG_DIR);
if (!fs_1.existsSync(dir)) {
    fs_1.mkdirSync(dir);
}
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
var level = function () {
    var env = process.env.NODE_ENV || "development";
    var isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};
// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
var colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
};
// Tell winston that you want to link the colors
// defined above to the severity levels.
winston_1["default"].addColors(colors);
// Chose the aspect of your log customizing the log format.
var format = winston_1["default"].format.combine(
// Add the message timestamp with the preferred format
winston_1["default"].format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), 
// Tell Winston that the logs must be colored
winston_1["default"].format.colorize({ all: true }), 
// Define the format of the message showing the timestamp, the level and the message
winston_1["default"].format.printf(function (info) { return info.timestamp + " " + info.level + ": " + info.message; }));
// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
var transports = [
    // Allow the use the console to print the messages
    new winston_1["default"].transports.Console(),
    // Allow to print all the error level messages inside the error.log file
    new winston_1["default"].transports.File({
        dirname: dir,
        filename: "error.log",
        level: "error"
    }),
    // Allow to print all the error message inside the all.log file
    // (also the error log that are also printed inside the error.log(
    new winston_1["default"].transports.File({ dirname: dir, filename: "all.log" }),
];
// Create the logger instance that has to be exported
// and used to log messages.
var logger = winston_1["default"].createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports: transports
});
exports.logger = logger;
var stream = {
    write: function (message) {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
    }
};
exports.stream = stream;
