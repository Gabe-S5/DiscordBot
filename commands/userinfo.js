module.exports = {
    name: 'userinfo',
    description: 'Displays Name and Avatar',
    execute(message) {
        return message.channel.send(`Your username: ${message.author.tag}\nYour Avatar: ${message.author.displayAvatarURL([,true,32])}`);
    }
}