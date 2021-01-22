module.exports = {
    name: 'ping',
    description: 'Replies Pong.',
    execute(message) {
        return message.channel.send('Pong.');
    }
}