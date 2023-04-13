const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')
require('dotenv').config()
// const cdw  = process.cwd

const connect = () => mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true
})

const runSql = (file) => async () => {
    const db = connect()
    const sql = fs.readFileSync(file, 'utf-8')
    await db.query(sql)
    await db.end()
}

const runMigration = runSql(path.resolve(process.cwd(), 'migration.sql'))
const runSeed = runSql(path.resolve(process.cwd(), 'seed.sql'))

module.exports = { connect, runMigration, runSeed }