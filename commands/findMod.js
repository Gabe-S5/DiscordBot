const curseForge = require('mc-curseforge-api');

module.exports = {
    name: 'find',
    description: 'Finds minecraft mod with following name and provides URL link on CurseForge.',
    find(message) {
        const args = message.content.split(" ");
        args.splice(0,1);
        const word = args.join(' ');
        curseForge.getMods({searchFilter: word}).then((mods) => {
            var i = 0;
            while (word != mods[i].name) { i++; }

            // Sends url of mod into chat
            if (word === mods[i].name) { message.channel.send(mods[i].url); }
            // If exact match is not found
            else { message.channel.send('Mod not found.') }
        })
        .catch((e) => { message.channel.send('Mod not found.') })
    }
}