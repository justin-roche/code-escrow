let env = {
    endpoint: process.env.EOS_HTTP_ENDPOINT || "http://localhost:8888",
    privateKey: process.env.EOS_PRIVATE_KEY || "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    actor: process.env.actor || "eosio",
    contract: process.env.contract || "addressbook"
}

export { env };
