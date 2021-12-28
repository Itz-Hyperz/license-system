const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message.author.id)
    if(!check) return message.channel.send({ content: "You are not a listed manager in the license system config file." });
    if(!args[0]) return message.channel.send({ content: "Please include a User Id when creating a license." })

    await con.query(`SELECT COUNT(id) as total FROM licenses`, async (err, row) => {
        if(err) throw err;
        let balls = await makeid(18)
        let id = Number(row[0].total + 1)
        if(row[0]) {
            await con.query(`INSERT INTO licenses (id, authKey, licenseOwnerId, authIp) VALUES (${id}, '${balls}', '${args[0]}', 'NA')`, async (err, row) => {
                if(err) console.log(err)
                let embed = new MessageEmbed()
                .setColor('#2F3136')
                .setTitle(`License Created!`)
                .setImage('https://cdn.hyperz.net/main/689JhO.png')
                .setDescription(`**ID:** \`${id}\`\n**authIp:** \`Not Set\`\n**Key:** ||\`${balls}\`||\n**licenseOwnerId:** \`${args[0]}\``)
                .setFooter(client.config.copyright)
                message.channel.send({ embeds: [embed] }).catch(e => {});
                message.author.send({ content: "Here is a backup of the new license you had created!", embeds: [embed] }).catch(e => {});
            });
        } else {
            await con.query(`INSERT INTO licenses (id, authKey, licenseOwnerId, authIp) VALUES (${id}, '${balls}', '${args[0]}', 'NA')`, async (err, row) => {
                if(err) console.log(err)
                let embed = new MessageEmbed()
                .setColor('#2F3136')
                .setTitle(`License Created!`)
                .setImage('https://cdn.hyperz.net/main/689JhO.png')
                .setDescription(`**ID:** \`${id}\`\n**authIp:** \`Not Set\`\n**Key:** ||\`${balls}\`||\n**licenseOwnerId:** \`${args[0]}\``)
                .setFooter(client.config.copyright)
                message.channel.send({ embeds: [embed] }).catch(e => {});
                message.author.send({ content: "Here is a backup of the new license you had created!", embeds: [embed] }).catch(e => {});
            });
        }
        let member = await client.users.fetch(args[0])
        if(member !== undefined) {
            try {
                let mail = new MessageEmbed()
                .setColor('#2F3136')
                .setTitle(`New License!`)
                .setThumbnail('https://cdn.hyperz.net/main/B4DeoE.png')
                .setImage('https://cdn.hyperz.net/main/Nkqe3U.gif')
                .setDescription(`**ID:** \`${id}\`\n**authIp:** \`Not Set\`\n**Key:** ||\`${balls}\`||\n**licenseOwnerId:** \`${args[0]}\`\n\nRun \`${client.config.prefix}update\` in a channel to update the authIp!`)
                .setFooter(client.config.copyright)
                member.send({ embeds: [mail] }).catch(e => {});
            } catch(e) {}
        }
    });

}

exports.info = {
    name: "licenseadd",
    description: "Create a new license key!",
    aliases: ['add', 'addlicense', 'create', 'createlicense', 'licensecreate']
}

async function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}
