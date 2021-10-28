exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message.author.id)
    if(!check) return message.channel.send({ content: "You are not a listed manager in the license system config file." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    });
    if(!args[0]) return message.channel.send({ content: "Please include something for the bot to say." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    });

    await message.channel.send({ content: args.join(" ") }).catch(e => {});

}

exports.info = {
    name: "say",
    description: "Make the bot say something!",
    aliases: ['echo']
}