const cd = require('camb-dict');
const dictionary = new cd.Dictionary();

module.exports = {
    name: 'pronounce',
    description: 'Pronounces word on voice channel',
    pronounce(message) {
        var channel = message.member.voice.channel;
        const args = message.content.split(" ");
        dictionary.meaning(args[1]).then((result) => {
            if (!channel) {
                message.channel.send("You must be in a voice channel for me to pronounce it for you.")
            }
            else {
                channel.join().then(connection => {
                console.log("Bot has connected to voice channel");
                const dispatcher = connection.play(result.audio[0].url);
                // dispatcher.on('finish', end => {channel.leave()});
                })
            }
        }).catch((e) => {
            message.channel.send('Word not found.')
        });
    }
}





