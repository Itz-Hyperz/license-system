const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    if(!args[0]) {
        await con.query(`SELECT * FROM licenses WHERE licenseOwnerId='${message.author.id}'`, async (err, rows) => {
            if(err) throw err;
            if(rows[0]) {
                let array = [];
                await rows.forEach(async data => {
                    array.push(`**ID:** ${data.id} - **AuthIp:** ||${data.authIp}|| - **Key:** ||${data.authKey}||`)
                });
                let embed = new MessageEmbed()
                .setColor('#2F3136')
                .setTitle(`List of Licenses`)
                .setThumbnail('https://cdn.hyperz.net/main/B4DeoE.png')
                .setDescription(array.join("\n"))
                .setFooter(message.author.id)
                message.channel.send({ content: "**Please check your DMs for information on the requested users licenses.**\nIf you didn't recieve a DM, please open your DMs and try again." }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                })
                message.author.send({ embeds: [embed] }).catch(e => {})
            } else {
                return message.channel.send({ content: `User Id \`${message.author.id}\` has no registered licenses.` }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {})
            }
        });
    } else {
        let check = await client.utils.permCheck(client, message.author.id)
        if(!check) return message.channel.send({ content: "You are not a listed manager in the license system config file." });
        await con.query(`SELECT * FROM licenses WHERE licenseOwnerId='${args[0]}'`, async (err, rows) => {
            if(err) throw err;
            if(rows[0]) {
                let array = [];
                await rows.forEach(async data => {
                    array.push(`**ID:** ${data.id} - **AuthIp:** ||${data.authIp}|| - **Key:** ||${data.authKey}||`)
                });
                let embed = new MessageEmbed()
                .setColor('#2F3136')
                .setTitle(`List of Licenses`)
                .setThumbnail('https://cdn.hyperz.net/main/B4DeoE.png')
                .setDescription(array.join("\n"))
                .setFooter(args[0])
                message.channel.send({ content: "**Please check your DMs for information on the requested users licenses.**\nIf you didn't recieve a DM, please open your DMs and try again." }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                })
                message.author.send({ embeds: [embed] }).catch(e => {})
            } else {
                return message.channel.send({ content: `User Id \`${args[0]}\` has no registered licenses.` }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {})
            }
        });
    }

}

exports.info = {
    name: "licenses",
    description: "Check a users licenses.",
    aliases: ['license', 'checkuser', 'usercheck', 'check', 'user', 'list']
}