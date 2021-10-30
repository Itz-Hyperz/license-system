const { MessageEmbed, MessageActionRow, MessageButton } = require(`discord.js`);

module.exports = async(client, con, interaction) => {

    try {

        if(!interaction.isButton()) return;

        let edited = new MessageEmbed()
        .setColor('#2F3136')
        .setTitle(`${client.user.username} Help Menu`)
        .setThumbnail(client.user.avatarURL({ dynamic: true }))

        let row = new MessageActionRow()
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

        let page2 = "`licenses` - Check a user for the licenses they have.\n`update` - Update the authorized Ip on one of your licenses.\n`ping` - Check latency.\n`help` - Gets you this menu.\n`credits` - View the bots credits.";
        let page3 = "`create` - Add a license to the license system.\n`delete` - Remove a license from the license system.\n`say` - Make the bot say something.";
        let page4 = `**Creators:**\n[@Hyperz](https://hyperz.net) - *Physical Programming.*\n\n[Hyperz Discord](https://hyperz.net/discord)\n[Hyperz Website](https://hyperz.net)`;
        let message = interaction.message
        if (interaction.customId === 'helpPageLeft') {

            // CODE FOR GOING BACK PAGES

            if(message.embeds) {
                message.embeds.forEach(async embed => {
                    if(embed.footer.text.includes('Page 1/4')) {
                        edited.fields = null;
                        edited.setDescription(page4);
                        edited.setFooter(`Page 4/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 2/4')) {
                        edited.setDescription(``);
                        edited.addFields(
                            { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
                            { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
                            { name: "About Server", value: `${client.config.aboutServer}`, inline: false, },
                            { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
                        )
                        edited.setFooter(`Page 1/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 3/4')) {
                        edited.fields = null;
                        edited.setDescription(page2);
                        edited.setFooter(`Page 2/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 4/4')) {
                        edited.fields = null;
                        edited.setDescription(page3);
                        edited.setFooter(`Page 3/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    }
                });
            }
        } else if (interaction.customId === 'helpPageRight') {

            // CODE FOR GOING FORWARD PAGES

            if(message.embeds) {
                message.embeds.forEach(async embed => {
                    if(embed.footer.text.includes('Page 1/4')) {
                        edited.fields = null;
                        edited.setDescription(page2);
                        edited.setFooter(`Page 2/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 2/4')) {
                        edited.fields = null;
                        edited.setDescription(page3);
                        edited.setFooter(`Page 3/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 3/4')) {
                        edited.fields = null;
                        edited.setDescription(page4);
                        edited.setFooter(`Page 4/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    } else if(embed.footer.text.includes('Page 4/4')) {
                        edited.setDescription(``);
                        edited.addFields(
                            { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
                            { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
                            { name: "About Server", value: `${client.config.aboutServer}`, inline: false, },
                            { name: "Copyright", value: `${client.config.copyright}`, inline: false, },
                        )
                        edited.setFooter(`Page 1/4`)
                        await message.edit({ embeds: [edited], components: [row] })
                        await interaction.deferUpdate();
                    }
                });
            } else {
                console.log('frick')
            }
    }
    
    } catch(e) {}

}
