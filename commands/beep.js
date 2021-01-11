module.exports = {
    name: 'beep',
    description: 'Replies Boop.',
    beep(message) {
        return message.channel.send('Boop.');
    }
}