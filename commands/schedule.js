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
    schedule(message) {
        nbaGames.nba_games_week().then(games => {
            // console.log(JSON.stringify(games, null, 2));
            const args = message.content.split(" ");

            if (args[1] === "today" || args[1] === "now") {
                var i = 0;
                while (games[i].date.split(", ")[1] === `${mm} ${dd}`) {
                    message.channel.send(`Home: ${games[i].home}\nAway: ${games[i].away}\nDate: ${games[i].date}\nTime: ${games[i].time}`);                   
                    i++;
                    if (games[i].time === "Postponed") { break; }
                }
            }
        });
    }
}