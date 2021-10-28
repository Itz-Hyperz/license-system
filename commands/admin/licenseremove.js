const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message.author.id)
    if(!check) return message.channel.send({ content: "You are not a listed manager in the license system config file." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    })
    if(!args[0]) return message.channel.send({ content: "Please include a license Id to revoke the license of." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    })

    await con.query(`SELECT * FROM licenses WHERE id=${args[0]}`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            await con.query(`DELETE FROM licenses WHERE id=${args[0]} LIMIT 1`, async (err, row) => {
                if(err) throw err;
                let embed = new MessageEmbed()
                .setColor('#2F3136')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`License revoked with Id \`${args[0]}\``)
                .setFooter(client.config.copyright)
                message.channel.send({ embeds: [embed] }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {});
            })
        } else {
            return message.channel.send({ content: "I was unable to find a license Id with that value." }).then((msg) => {
                if(client.config.deleteCommands) {
                    setTimeout(() => {
                        msg.delete().catch(e => {});
                    }, 14000);
                }
            })
        }
    });

}

exports.info = {
    name: "licenseremove",
    description: "Remove a license key!",
    aliases: ['remove', 'removelicense', 'delete', 'deletelicense', 'licensedelete']
}
