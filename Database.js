let mysql = require("mysql");
require('dotenv').config();
let pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const executeQuery = async (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })
}

const executeQueryWithParam = async (query, param) => {
    return new Promise((resolve, reject) => {
        pool.query(query, param, (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })
}

const idMax = async (namaField,namaTable,where) => {
    let query = 
    `SELECT lpad(ifnull(max(substr(${namaField}, -4)), 0) + 1,4, '0') as max from
    ${namaTable} ${where}`;
    console.log(query);
    let kode = await executeQuery(query);
    
    return kode[0].max;
}

module.exports= {
    'executeQuery' : executeQuery,
    'executeQueryWithParam' : executeQueryWithParam,
    idMax,
}