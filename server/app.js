"use strict";
exports.__esModule = true;
var body_parser_1 = require("body-parser");
var compression = require("compression");
var express = require("express");
var path = require("path");
// import { authorization } from "./auth";
var nodeCleanup = require('node-cleanup');
var rq = require('request');
var app = express();
exports.app = app;
app.use(body_parser_1.json());
app.use(compression());
app.use(body_parser_1.urlencoded({ extended: true }));
app.disable("x-powered-by");
// authorization(app)
// app.use('/api', apiRouter);
console.log('process mode', process.env.NODE_ENV);
app.use(express.static(path.join(__dirname, "/../dist/code-escrow")));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../dist/code-escrow/index.html'));
});
nodeCleanup(function (exitCode, signal) {
    // cluster.destroy()
});
