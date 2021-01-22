const ud = require('urban-dictionary');
const cd = require('camb-dict');
const dictionary = new cd.Dictionary();

module.exports = {
    name: 'define',
    description: 'Defines word given and provides pronounciation if possible. Requires dictionary input',
    execute(message, args) {
        if (!args[0]) {
            message.channel.send('Please type what word you would like to define.');
        }
        else if (!args[1]) {
            message.channel.send('Please indicate which dictionary you would like to use: Cambridge(cd) or Urban(ud).')
        }
        else if (args[1].startsWith('cd')) {
            dictionary.meaning(args[1]).then((result) => {
                message.channel.send(`Word: ${result.word}\nDefinition: ${result.meaning}`);
            })
            .catch((e) => { message.channel.send('Word not found.') });
        }
        else if (args[1].startsWith('ud')) {
            ud.define(args[0]).then((results) => {
                Object.entries(results[0]).forEach(([key, prop]) => {
                    if (key === "definition" || key === "word" || key === "example") {
                        message.channel.send(`${key}: ${prop.replace(/([\[\]])/g,'')}`)
                    }
                })
            })
            .catch((e) => { message.channel.send('Word not found.') })
        }  
    }
}