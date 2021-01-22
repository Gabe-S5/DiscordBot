module.exports = {
    name: 'beep',
    description: 'Replies Boop.',
    execute(message) {
        return message.channel.send('Boop.');
    }
}