import { Api, JsonRpc } from 'eosjs';
import { env } from '../env';
let Router = require('express').Router
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

const r = Router();

r.post("/submit", (request, response) => {
    console.log('run action', request.body);
})

r.get("/companies", (request, response) => {
    console.log('getting records', request.body);

})

async function takeAction(action, dataValue) {
    const rpc = new JsonRpc(env.endpoint);
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
        return resultWithConfig;
    } catch (err) {
        throw (err)
    }
}

async function getItem() {
    console.log('getting item');

    try {
        const rpc = new JsonRpc(env.endpoint);
        const result = await rpc.get_table_rows({
            "json": true,
            "code": env.contract,    // contract who owns the table
            "scope": env.contract,   // scope of the table
            "table": "users",    // name of the table as specified by the contract abi
            "limit": 1,
            "lower_bound": "alice",
        });
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

module.exports = { apiRouter: r };
