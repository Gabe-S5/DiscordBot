module.exports = {
    name: 'ping',
    description: 'Replies Pong.',
    ping(message) {
        return message.channel.send('Pong.');
    }
}