import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

import * as apiRouter from "./api-route/route";

let rq = require('request')
const app: express.Application = express();

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/api", (<any>apiRouter));

app.use(express.static(path.join(__dirname, "/../client")));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

