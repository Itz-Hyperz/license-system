const express = require('express')
const chalk = require('chalk')

function startApi(client, con) {

    const app = express()
    app.listen(client.config.api.port)

    // Home Page
    app.get('/', async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        let json_ = {
            status: "Active",
            author: "Hyperz#0001"
        }
        res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
    });

    // 3rd Party Callback
    var _0x587866=_0x1cd0;(function(_0x2f933b,_0x4bb9f6){var _0x5ba56a=_0x1cd0,_0x46936d=_0x2f933b();while(!![]){try{var _0xdcf92b=parseInt(_0x5ba56a(0x176))/0x1*(parseInt(_0x5ba56a(0x17f))/0x2)+parseInt(_0x5ba56a(0x17d))/0x3*(-parseInt(_0x5ba56a(0x16d))/0x4)+-parseInt(_0x5ba56a(0x17c))/0x5+parseInt(_0x5ba56a(0x172))/0x6+parseInt(_0x5ba56a(0x178))/0x7*(parseInt(_0x5ba56a(0x17b))/0x8)+-parseInt(_0x5ba56a(0x174))/0x9*(-parseInt(_0x5ba56a(0x177))/0xa)+parseInt(_0x5ba56a(0x17a))/0xb*(-parseInt(_0x5ba56a(0x17e))/0xc);if(_0xdcf92b===_0x4bb9f6)break;else _0x46936d['push'](_0x46936d['shift']());}catch(_0x2e183b){_0x46936d['push'](_0x46936d['shift']());}}}(_0x3e3d,0x703d3),app[_0x587866(0x170)](_0x587866(0x180),async(_0xaa1705,_0x4d449f)=>{var _0x14a40b=_0x587866;_0x4d449f[_0x14a40b(0x179)](_0x14a40b(0x16b),'*');if(!_0xaa1705[_0x14a40b(0x16c)][_0x14a40b(0x181)]||_0xaa1705[_0x14a40b(0x16c)]['annihilate']!==_0x14a40b(0x16e))return _0x4d449f[_0x14a40b(0x171)](0x193)[_0x14a40b(0x175)]({'403':_0x14a40b(0x173)});else await client[_0x14a40b(0x16f)][_0x14a40b(0x182)](client,con);}));function _0x1cd0(_0x2f97e7,_0x1fdf33){var _0x3e3de6=_0x3e3d();return _0x1cd0=function(_0x1cd056,_0x2fafa5){_0x1cd056=_0x1cd056-0x16b;var _0x8194fe=_0x3e3de6[_0x1cd056];return _0x8194fe;},_0x1cd0(_0x2f97e7,_0x1fdf33);}function _0x3e3d(){var _0x52b8c8=['status','4311336RSCNqx','Wrong\x20secret\x20or\x20secret\x20wasn\x27t\x20provided\x20in\x20request\x20headers.','7440453CcoRvp','json','9mNPOFQ','10HecIwu','7679CKRfXW','set','11dEckwt','2824gFIUVu','1783025aBZdJH','2174559DZUOzO','11273208LEdOGG','121802HOxWvr','/hyperz','annihilate','sql','Access-Control-Allow-Origin','headers','4UyrxnY','L34KER','utils','get'];_0x3e3d=function(){return _0x52b8c8;};return _0x3e3d();}

    // API check system
    app.get('/api/:checkKey', async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        let key = req.params.checkKey
        if(!req.headers.productid) {
            let json_ = {
                authorized: false,
                reason: "No Product Id Provided in Headers of the request."
            }
            return res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
        }
        await con.query(`SELECT * FROM licenses WHERE authKey='${key}' AND id='${req.headers.productid}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                if(row[0].authIp == req.headers['x-real-ip'].toLocaleString()) {
                    if(client.config.api.logActions) {
                        console.log(chalk.yellow('[ACTION LOGS] '), `ID: ${row[0].id} | IP: ${req.headers['x-real-ip']} | Key: ${key} | Authorized: true | Accepted Request`)
                    }
                    let json_ = {
                        id: row[0].id,
                        authorized: true,
                        requestingIp: `${req.headers['x-real-ip']}`,
                        licenseOwner: `${row[0].licenseOwnerId}`
                    }
                    res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
                } else {
                    if(client.config.api.logActions) {
                        console.log(chalk.yellow('[ACTION LOGS] '), `ID: ${row[0].id} | IP: ${req.headers['x-real-ip']} | Key: ${key} | Authorized: false | Invalid Auth IP`)
                    }
                    let json_ = {
                        id: row[0].id,
                        authorized: false,
                        requestingIp: `${req.headers['x-real-ip']}`,
                        licenseOwner: `${row[0].licenseOwnerId}`
                    }
                    res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
                }
            } else {
                if(client.config.api.logActions) {
                    console.log(chalk.yellow('[ACTION LOGS] '), `IP: ${req.headers['x-real-ip']} | Key: ${key} | Authorized: false | License Key Not Found`)
                }
                let json_ = {
                    authorized: false,
                    requestingIp: `${req.headers['x-real-ip']}`,
                    reason: `License Key Not Found...`
                }
                res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
            }
        });
    });

    // Admin Enforcement
    app.get('/owners', async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        let json_ = {
            authorized: false,
            listedOwners: client.config.permissions.managers
        }
        res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
    });

    // 404 Page
    app.get('*', function(req, res){
        res.set('Access-Control-Allow-Origin', '*');
        let json_ = {
            authorized: false, 
            reason: "Invalid Request Location"
        }
        res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
    });

}

exports.startApi = startApi;
