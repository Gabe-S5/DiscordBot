var fs = require('fs');
const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
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

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    // Ignores bot messages
    if (message.author.bot) return;
    // Ping
    if (message.content.startsWith(`${prefix}ping`)){ command.ping(message); }
    // Beep
    else if (message.content.startsWith(`${prefix}beep`)) { command.beep(message); } 
    // Commands
    if (message.content === '!commands') {
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            message.channel.send(`${prefix}${command.name}: ${command.description}`);
        }
    }
    // User Info
    if (message.content.startsWith(`${prefix}userinfo`)) {
        command.userinfo(message);
    }
    // Define
    if (message.content.startsWith(`${prefix}define`)) {
        command.define(message);
    }
    // Pronounce
    if (message.content.startsWith(`${prefix}pronounce`)) {
        command.pronounce(message);
    }
    if (message.content.startsWith(`${prefix}find`)) {
        command.find(message);
    }
});

client.login(token);