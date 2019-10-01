import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

// import { authorization } from "./auth";

var nodeCleanup = require('node-cleanup');


let rq = require('request')
const app: express.Application = express();

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.disable("x-powered-by");


// authorization(app)

// app.use('/api', apiRouter);

console.log('process mode', process.env.NODE_ENV)

app.use(express.static(path.join(__dirname, "/../dist")));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

nodeCleanup(function(exitCode, signal) {
    // cluster.destroy()
});

// export { app };
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

