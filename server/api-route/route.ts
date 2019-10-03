let myfetch = require('node-fetch');
console.log('myfetch', typeof myfetch);

const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
import { Api, JsonRpc } from 'eosjs';
import { env } from '../env';
let Router = require('express').Router
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

const r = Router();

r.get("/block", (request, response) => {
    const rpc = new JsonRpc(env.endpoint, { fetch: myfetch });
    rpc.get_block(1).then(console.log);
})

r.get("/companies", (request, response) => {
    console.log('getting records', request.body);
    getAll((r) => {
        console.log('resuls', r);
        response.json({ rows: r });
    })
})

r.post("/submit", (request, response) => {
    console.log('posting records', request.body);
    let data = Object.assign({ user: "eosio" }, request.body.data);
    takeAction("upsert", data, (r) => {
        response.json(r);
    });
})

async function getAll(cb) {
    // console.log('getting items');
    try {
        const rpc = new JsonRpc(env.endpoint, { fetch: myfetch });
        const result = await rpc.get_table_rows({
            "json": true,
            "code": "addressbook",
            "scope": "addressbook",
            "table": "people",
            "limit": 100,
            "upper_bound": -1,
        });
        // console.log('res 1', result);
        cb(result.rows);
    } catch (err) {
        console.error(err);
    }
}
async function takeAction(action, dataValue, cb) {
    const rpc = new JsonRpc(env.endpoint, { fetch: myfetch });
    const privateKey = env.privateKey;
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    try {
        const resultWithConfig = await api.transact({
            actions: [{
                account: env.contract,
                name: action,
                authorization: [{
                    actor: env.actor,
                    permission: 'active',
                }],
                data: dataValue,
            }]
        }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
        console.log('result:', resultWithConfig);
        cb(resultWithConfig);
    } catch (err) {
        throw (err)
    }
}


module.exports = { apiRouter: r };
