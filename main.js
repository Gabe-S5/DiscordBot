var fs = require('fs');
const {prefix, token} = require('./.credentials/config.json');
const Discord = require('discord.js');

const client = new Discord.Client();;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
// console.log(client.commands);

client.once('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    client.user.setActivity('Spelling Beet', { type: 'PLAYING' })
    client.user.setPresence({ activity: { name: 'Something' }, status: 'online' })
});

client.on('message', message => {

    // Makes chat visible on logs, including name of author
    console.log(`[${message.author.tag}]: ${message.content}`);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Show commands
    if (message.content.startsWith(`${prefix}commands`)) {
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            message.channel.send(`${prefix}${command.name}: ${command.description}`);
        }
    }
    // Not an existing command
    if (!client.commands.has(command)) return;

    // Try/Catch for each command.name in the commands folder 
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error while trying to execute that command. ')
    }
});

client.login(token);