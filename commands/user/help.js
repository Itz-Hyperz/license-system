const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { readdirSync} = require('fs');
const { join } = require('path');

exports.run = async (client, message, args, con) => {

    if(!args[0]) {
        helpEmbed(client, message)
    } else {
        readdirSync(join(__dirname, '../')).forEach(dir => {
            const commands = readdirSync(join(__dirname, '../', `${dir}`)).filter(f => f.endsWith('.js'));

            for (let file of commands) {
                let cinfo = require(`../${dir}/${file}`);
                if (args[0].toLowerCase() !== cinfo.info.name) continue;
                return commandEmbed(client, message, args, MessageEmbed, cinfo)
            }
        });
    }

}

exports.info = {
    name: "help",
    description: "View all commands and info about the bot!",
    aliases: ['commands']
}

async function helpEmbed(client, message) {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('helpPageLeft')
        .setLabel(`Back`)
        .setStyle(`PRIMARY`),
    )
    .addComponents(
        new MessageButton()
        .setCustomId('helpPageRight')
        .setLabel(`Next`)
        .setStyle(`PRIMARY`),
    )
    let embed = new MessageEmbed()
    .setColor('#2F3136')
    .setTitle(`${client.user.username} Help Menu`)
    .addFields(
        { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
        { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
        { name: "About Server", value: `${client.config.aboutServer}`, inline: false, },
        { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
    )
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(`Page 1/4`)
    message.channel.send({ embeds: [embed], components: [row] }).catch(e => {});
};

async function commandEmbed(client, message, args, MessageEmbed, cinfo) {
    let embed = new MessageEmbed()
    .setColor('#2F3136')
    .setTitle(`Command Help`)
    .setDescription(`**Name:** \`${cinfo.info.name}\`\n**Description:** \`${cinfo.info.description}\`\n**Aliases:** \`${cinfo.info.aliases.join(", ")}\`\n`)
    .setTimestamp()
    .setFooter(client.config.copyright)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
};