require('dotenv').config()
const { Client } = require("cassandra-driver");

const client = new Client({
    cloud: {
        secureConnectBundle: './secure-connect-testdb.zip'
    },
    credentials: {username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD},
})

module.exports = {
    client
}