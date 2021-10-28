const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const mysql = require('mysql');
const chalk = require('chalk');

let useSQL = true; // DO NOT CHANGE THIS, IT MAY BREAK THE BOT
let con;

class HDClient extends Client {
    constructor(options = {}) {
        super(options);

        this.config = require(`../config`);
        this.utils = require(`./utils/utils`);

        this.commands = new Collection();
        this.aliases = new Collection();
    };
};

const client = new HDClient({
    intents: ['GUILDS', 'GUILD_MESSAGES', "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"],
    partials: ["CHANNEL", "MESSAGE", "REACTIONS"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});

global.__basedir = __dirname;

setTimeout(() => {
    const version = Number(process.version.split('.')[0].replace('v', ''));
    if (version < 16) return console.log(chalk.blue('\n\nPlease upgrade to Node v16 or higher\nPlease upgrade to Node v16 or higher\nPlease upgrade to Node v16 or higher\n\n'));
}, 8000);

const init = async() => {
    try {

        if (useSQL) {
            try {
                const stuff = {
                    connectionLimit: 10,
                    queueLimit: 5000,
                    host: client.config.database.host,
                    user: client.config.database.user,
                    password: client.config.database.password,
                    database: client.config.database.database,
                }
                con = mysql.createPool(stuff)
                setTimeout(() => {
                    console.log('MySQL Successfully Connected!')
                }, 4000);
                con.on('enqueue', function () {
                    if(client.config.debugmode) {
                        console.log(`${chalk.yellow('[SQL SERVER]')} Waiting for available connection slot`);
                    }
                });
                con.on('release', function (connection) {
                    if(client.config.debugmode) {
                        console.log(`${chalk.yellow('[SQL SERVER]')} Connection %d released`, connection.threadId);
                    }
                });
            } catch (e) {
                client.utils.error(client, e)
                return process.exit(1);
            }
        }

        // Command Handler
        const categories = readdirSync(join(__dirname, `../`, `commands`));
        for (let category of categories) {
            const commands = readdirSync(join(__dirname, `../`, `commands/`, category));
            for (let command of commands) {
                let info = require(`../commands/${category}/${command}`);
                if (info.info.name) {
                    client.commands.set(info.info.name, info);
                    if(client.config.logCommandLoading) {
                        setTimeout(() => {
                            console.log(`${chalk.blue('Loaded Command')} ../commands/${category}/${command}`)
                        }, 9000)
                    }
                } else {
                    console.log(`No help name or additional info found for ${command}`);
                    continue;
                }
                if (info.info.aliases[0]) {
                    try {
                        info.info.aliases.forEach(a => {
                            client.commands.set(a, info);
                        })
                    } catch(e) {
                        console.log(`An error occured when adding aliases for ${command}`);
                        continue;
                    }
                }
            }
        };

        // Event handler
        const events = readdirSync(join(__dirname, `../`, `events`));
        events.forEach(e => {
            const name = e.split('.')[0];
            const event = require(`../events/${e}`);
            client.on(name, event.bind(null, client, con));
            delete require.cache[require.resolve(`../events/${e}`)];
        });

    client.login(client.config.token).catch(e => console.log(e));
    } catch(e) {
        console.log(e)
    }
}

process.on('unhandledRejection', (err) => { 
    if(err !== "DiscordAPIError: Unknown Message") {
        console.log(chalk.red(`\nFATAL ERROR: \n\n`, err.stack))
    }
});

exports.init = init;