const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'poll',
    description: 'Creates a poll',
    execute: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR'))
            return message.channel.send('You do not have Admin permission')

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }
        
        let question = args.slice(1).join(' ')

        if(!question) {
            return message.channel.send('You did not specify a question for your poll')
        }

        const MAX_REACTIONS = 0;
      
        try {
            // send a message and wait for it to be sent
            const sentMessage = await message.channel.send('New poll:\n' + question);

            const valid_reactions = ['👍', '👎', '🤠'];

            valid_reactions.forEach(element => sentMessage.react(element));

            // react to the sent message

            // await sentMessage.react('👍');

            for (let count = 0; count < valid_reactions.length; count++) {
                // set up a filter to only collect reactions with the 👍 emoji
                // and don't count the bot's reaction
                filter = (reaction, user) => reaction.emoji.name === valid_reactions[count] && !user.bot;

                // set up the collecrtor with the MAX_REACTIONS
                collector = sentMessage.createReactionCollector({ filter, time: 5000 });

                collector.on('collect', (reaction) => {
                    // in case you want to do something when someone reacts with 👍
                    console.log(`Collected a new ${reaction.emoji.name} reaction`);
                });

                // fires when the time limit or the max is reached
                collector.on('end', (collected) => {
                    // reactions are no longer collected
                    // if the 👍 emoji is clicked the MAX_REACTIONS times
                    return message.channel.send(`We got this many ${valid_reactions[count]}: ${collected.size}`);

                });
            }
          } catch (error) {
            // "handle" errors
            console.log(error);
          }
    }
}