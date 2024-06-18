require('dotenv').config();

module.exports = {
    development: {
        usename: "postgres",
        password: "admin@123",
        database: "MyServiceTracker",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
}