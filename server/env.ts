let env = {
    endpoint: process.env.EOS_HTTP_ENDPOINT || "http://localhost:8888",
    privateKey: process.env.EOS_PRIVATE_KEY || 1,
    actor: process.env.actor || "eosio",
    contract: process.env.contract || "addressbook"
}

export { env };
