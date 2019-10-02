let myfetch = require('node-fetch');
console.log('myfetch', typeof myfetch);

const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
import { Api, JsonRpc } from 'eosjs';
import { env } from '../env';
let Router = require('express').Router
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

const r = Router();

async function getItem() {
    console.log('getting item');

    try {
        let x = { fetch: myfetch };
        console.log('f obj', x);

        const rpc = new JsonRpc(env.endpoint, { fetch: myfetch });
        // rpc.get_block(1).then(console.log);

        // const result = await rpc.get_table_rows({
        //     "json": true,
        //     "code": env.contract,
        //     "scope": env.contract,
        //     // "table": "addressbook",
        //     "limit": 1,
        //     "lower_bound": "alice",
        // });
        // // return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}


r.get("/companies", (request, response) => {
    console.log('getting records', request.body);
    getItem();
})

r.get("/block", (request, response) => {
    const rpc = new JsonRpc(env.endpoint, { fetch: myfetch });
    rpc.get_block(1).then(console.log);
})

r.post("/submit", (request, response) => {
    console.log('posting records', request.body);
    let data = {
        user: "john",
        first_name: "John",

        last_name: "McMasters",
        street: "aaa",
        city: "bbb",
        state: "ccc"
    }
    takeAction("upsert", data);

})

async function takeAction(action, dataValue) {
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

        return resultWithConfig;
    } catch (err) {
        throw (err)
    }
}


module.exports = { apiRouter: r };
