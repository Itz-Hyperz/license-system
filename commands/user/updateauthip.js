const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    if(!args[1]) return message.channel.send({ content: `Please use the correct command input: \`${client.config.prefix}update licenseKey newIp\`\n**Ex:** \`${client.config.prefix}update aBcDeF41235213F 127.0.0.1\`` })

    await con.query(`SELECT * FROM licenses WHERE authKey='${args[0]}' AND licenseOwnerId='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            await con.query(`UPDATE licenses SET authIp='${args[1]}' WHERE authKey='${args[0]}' AND licenseOwnerId='${message.author.id}'`, async (err, row) => {
                if(err) throw err;
                let embed = new MessageEmbed()
                .setColor('#2F3136')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`License Key Updated!`)
                message.channel.send({ embeds: [embed] }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {});
            })
        } else {
            return message.channel.send({ content: "**License Key Not Found!**\n- Make sure it is the correct key.\n- Make sure it is under your Discord Id.\n- Make sure the API is online." }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            })
        }
    })

}

exports.info = {
    name: "updateauthip",
    description: "Update the authorized Ip to a license key.",
    aliases: ['update', 'ip', 'change', 'changeip', 'ipchange']
}