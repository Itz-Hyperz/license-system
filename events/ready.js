let i = 0;
const chalk = require('chalk');
const express = require("express");
const nodelogger = require('hyperz-nodelogger')
const logger = new nodelogger()
const { startApi } = require('../api/api.js')

module.exports = async(client, con, ready) => {

    try {

        startApi(client, con);

        const app = express()
        app.listen(client.config.port)

        changeStatus(client)

        let lol = client.config.themeColor
        let frick;
        let themecolor;
        let commandcount = client.config.command_count;
        let eventcount = client.config.event_count;
        switch(lol) {
            case "blue":
                frick = `${chalk.white(`Watching `)}${chalk.blue(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.blue(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.blue(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.blue(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.blue(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.blue(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.blue(commandcount)}\n${chalk.white(`Events: `)}${chalk.blue(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.blue('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'blue'
                break;
            case "green":
                frick = `${chalk.white(`Watching `)}${chalk.green(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.green(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.green(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.green(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.green(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.green(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.green(commandcount)}\n${chalk.white(`Events: `)}${chalk.green(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.green('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'green'
                break;
            case "red":
                frick = `${chalk.white(`Watching `)}${chalk.red(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.red(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.red(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.red(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.red(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.red(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.red(commandcount)}\n${chalk.white(`Events: `)}${chalk.red(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.red('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'red'
                break;
            case "yellow":
                frick = `${chalk.white(`Watching `)}${chalk.yellow(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.yellow(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.yellow(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.yellow(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.yellow(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.yellow(client.config.prefix)}${chalk.blue(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.yellow(commandcount)}\n${chalk.white(`Events: `)}${chalk.yellow(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.yellow('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.blue(client.config.debugmode)}`;
                themecolor = 'yellow'
                break;
            case "magenta":
                frick = `${chalk.white(`Watching `)}${chalk.magenta(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.magenta(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.magenta(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.magenta(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.magenta(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.magenta(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.magenta(commandcount)}\n${chalk.white(`Events: `)}${chalk.magenta(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.magenta('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'magenta'
                break;
            default:
                frick = `${chalk.white(`Watching `)}${chalk.blue(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.blue(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.blue(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.blue(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.blue(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.blue(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.blue(commandcount)}\n${chalk.white(`Events: `)}${chalk.blue(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.blue('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
                themecolor = 'blue'
        }
        
        await logger.hypelogger(`${client.user.username}`, '600', themecolor, frick, 'disabled', themecolor, 'single', true)
        setTimeout(() => {
            console.log(`\n\n    ------ CONSOLE LOGGING BEGINS BELOW ------\n\n`)
        }, 800)

    } catch(e) {
        console.log(e)
    }

}

async function changeStatus(client) {
    if (i >= client.config.presence.length) i = 0;
    await client.user.setPresence({
        activities: [{
            name: client.config.presence[i].name,
            type: client.config.presence[i].type
        }],
        status: client.config.presence[i].status
    });
    i++;
    setTimeout(() => {
        changeStatus(client);
    }, 10000)

};