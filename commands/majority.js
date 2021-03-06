const { getMajorityParams } = require('./params_middleware')

module.exports = {
    name: 'majority',
    description: 'Creates the winner being determined by majority',
    execute: async (message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send('You do not have Admin permission')

        let { channel, roleID, time_limit,percentage, question} = getMajorityParams(message, args)

        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }
        if(!question) {
            return message.channel.send('You did not specify a question for your poll')
         }else if(!time_limit){
            return message.channel.send('You did not specify a time limit for your poll')
        }else if(!roleID){
            return message.channel.send('You did not specify a role for your poll')
        }else if(!percentage){
            return message.channel.send('You did not specify a percentage')
        }
        

        // GET TOTAL NUMBER OF PEOPLE WITH ROLE TYPE AS VARIABLE ROLE
        let role = message.guild.roles.cache.get(roleID);
        message.channel.send({content: `${role.members.size} members have this role!`});
        const totalRoleMembers = role.members.size
        
        // // RETURN OR CREATE THE NUMBER OF PEOPLE THAT MAKES MAJORITY
        const MAJORITY = Math.floor(totalRoleMembers * (percentage / 100))
        //Don't have to know when they take away the reaction, just update the time when they react again

            let members_array = new Array();
            role.members.forEach(user => {
                members_array.push(user.user.username);
            });

        
        // CREATE THE QUESTION AND SEND TO DISCORD GUILD
            try {
            // send a message and wait for it to be sent
            const sentMessage = await message.channel.send('New poll:\n' + question);

            const valid_reactions = ['👍', '👎'];
            time_limit = time_limit * 1000

            // react to the sent message
            valid_reactions.forEach(element => sentMessage.react(element));

            // set up a filter to only collect reactions from the array of valid reactions
            // and don't count the bot's reaction
                
            for(let count = 0; count < valid_reactions.length; count++) {
                const filter = (reaction, user) => valid_reactions.includes(reaction.emoji.name) && !user.bot && members_array.includes(user.username);

                // set up the collecrtor with the MAX_REACTIONS
                const collector = sentMessage.createReactionCollector({ filter, time: time_limit, max: MAJORITY });

                collector.on('collect', (reaction, user) => {
                    console.log(`Collected a new ${reaction.emoji.name} reaction and ${user.tag} reacted`);
                });

                // fires when the time limit or the max is reached
                collector.on('end', (collected) => {
                  // reactions are no longer collected
                  // if the 👍 or 👎 emoji is clicked the MAX_REACTIONS times
                    return message.channel.send(`${valid_reactions[count]}: ${collected.size}`);
                });
            }
          } catch (error) {
            console.log(error);
          }
    }
}
