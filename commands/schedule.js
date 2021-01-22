const Discord = require('discord.js');
const nbaGames = require('nba-bball');
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
var today = new Date();
var dd = String(today.getDate());
var mm = String(today.getMonth());
mm = monthNames[mm];


module.exports = {
    name: 'schedule',
    description: 'Displays schedule of all upcoming basketball games.',
    execute(message, args) {
        nbaGames.nba_games_week().then(games => {
            // console.log(JSON.stringify(games, null, 2));
            if (args[0] === "today" || args[0] === "now") {
                var i = 0;
                const exampleEmbed = new Discord.MessageEmbed()
                    .setTitle('NBA Schedule')
                    .setDescription('The following are the upcoming NBA games for today.')
                    .setColor('#FF0000')
                while (games[i].date.split(", ")[1] === `${mm} ${dd}`) {
                    exampleEmbed.addField(`${games[i].away} at ${games[i].home}`, `Date: ${games[i].date}\nTime: ${games[i].time}`, true )
                    // message.channel.send(`Home: ${games[i].home}\nAway: ${games[i].away}\nDate: ${games[i].date}\nTime: ${games[i].time}`);                   
                    i++;
                    if (games[i].time === "Postponed") {break;}
                }
                message.channel.send(exampleEmbed);
            }
        })
        .catch((e) => { message.channel.send("Schedule not found." )})
    }
}