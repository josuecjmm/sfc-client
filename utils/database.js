const mysql = require('mysql2');
const database = require('../config/database.config');
const pool = mysql.createPool(database.config);
const poolPromise = pool.promise();
const crypto = require('./crypto');

const argv = require('yargs').argv;

const date = new Date();

exports.select = async (query, values) => {
    let result;
    try {
        const [rows,fields] = await poolPromise.execute(query, values);
        result = rows;
        if(argv.encrypted === "true") {
            const values = result.map(value => {
                const keys = Object.keys(value);
                const vals =  Object.values(value).map(v =>{
                    if(isNaN(v)) {
                        return crypto.decrypt(v).length > 0
                            ? crypto.decrypt(v)
                            : v;
                    } else {
                        return v
                    }
                });
                return Object.assign(...keys.map(
                    (k, i) =>
                        ({[k]: vals[i]})))
            });
            result = values;
        }
    } catch (e) {
        throw Error(e);
    }
    return JSON.stringify(result);
};

exports.insertUpdate = async(query, values) => {
    let error;
    try {
        // Encryption
        if(argv.encrypted === "true") {
            const encryptedValues = values.map(value => {
                const v = isNaN(value) ? crypto.encrypt(value) : value;
                return v
            });
            values = encryptedValues;
        }
        await poolPromise.execute(query, values)
    } catch (e) {
        error = e;
        throw Error(e)

    }
};
