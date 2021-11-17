const { getParams } = require('./params_middleware')

module.exports = {
    name: 'voting',
    description: 'Creates a poll',
    execute: async (message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR'))
            return message.channel.send('You do not have Admin permission')

        let { channel, roleID, time_limit, question} = getParams(message, args)
        
        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }
        if(!question) {
            return message.channel.send('You did not specify a question for your poll')
        }else if(!roleID){
            return message.channel.send('You did not specify a role for your poll')
        }else if(!time_limit){
            return message.channel.send('You did not specify a time limit for your poll')
        }


        let role = message.guild.roles.cache.get(roleID);
        let members_array = new Array();
        role.members.forEach(user => {
            members_array.push(user.user.username);
        });
      
        try {
            // sends a question and wait for it to be sent
            const sentMessage = await message.channel.send('New poll:\n' + question);

            const valid_reactions = ['👍', '👎', '🤠'];
            time_limit = time_limit * 1000
            
            // sends reactions to message
            valid_reactions.forEach(element => sentMessage.react(element));

            // creates a collector for each reaction
            for (let count = 0; count < valid_reactions.length; count++) {
                // set up a filter to only collect reactions with the 👍 emoji
                // and don't count the bot's reaction
                filter = (reaction, user) => reaction.emoji.name === valid_reactions[count] && !user.bot && members_array.includes(user.username);

                // set up the collector with the a time_limit
                collector = sentMessage.createReactionCollector({ filter, time: time_limit });

                collector.on('collect', (reaction) => {
                    // in case you want to do something when someone reacts with 👍
                    console.log(`Collected a new ${reaction.emoji.name} reaction`);
                });

                // fires when the time limit or the max is reached
                collector.on('end', (collected) => {
                    // reactions are no longer collected
                    return message.channel.send(`${valid_reactions[count]}: ${collected.size}`);

                });
            }
          } catch (error) {
            // "handle" errors
            console.log(error);
          }
    }
}
