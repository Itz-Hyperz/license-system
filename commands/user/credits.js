const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    let embed = new MessageEmbed()
    .setColor('#2F3136')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`**Creators:**\n[@Hyperz](https://hyperz.net) - *Physical Programming.*\n\n[Hyperz Discord](https://hyperz.net/discord)\n[Hyperz Website](https://hyperz.net)`)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "credits",
    description: "View the credits for this bot!",
    aliases: ['creator', 'hyperz']
}
