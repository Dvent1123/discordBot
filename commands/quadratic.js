
module.exports = {
    name: 'quadratic',
    description: 'Creates a poll that uses quadratic voting',
    execute: async (message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send('You do not have ')

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }

        // -quadratic <Guild ID/Name> <Specified Role> <Time Limit> <Reaction Limit> <Question>

        let argsArray = args.slice()
        const roleID = argsArray[1].slice(3, argsArray[1].length-1)
        let time_limit = parseInt(argsArray[2])
        const reaction_limit = parseInt(argsArray[3])
        const question = args.slice(4).join(' ')

        if(!question) {
            return message.channel.send('You did not specify a question for your poll')
        }else if(!roleID){
            return message.channel.send('You did not specify a role for your poll')
        }else if(!time_limit){
            return message.channel.send('You did not specify a time limit for your poll')
        }else if(!reaction_limit){
            return message.channel.send('You did not specify a reaction limit for your poll')
        }
        // Role
        let role = message.guild.roles.cache.get(roleID);
        message.channel.send({content: `Question: ${question}`});
        const totalRoleMembers = role.members.size

        // puts all member usernames in an array
        let members_array = new Array();
        role.members.forEach(user => {
            members_array.push(user.user.username);
        });


        try {
            // send a message and wait for it to be sent
            const sentMessage = await message.channel.send('New poll:\n' + question);

            const all_reactions = ['👍', '😀', '🤠','😗','😉'];
            let valid_reactions = []

            for(let i = 0; i < reaction_limit; i++) {
                valid_reactions.push(all_reactions[i])                
            }


            // react to the sent message
            valid_reactions.forEach(element => sentMessage.react(element));

            // set up a filter to only collect reactions from the array of valid reactions
            // and don't count the bot's reaction
            const filter = (reaction, user) => valid_reactions.includes(reaction.emoji.name) && !user.bot && members_array.includes(user.username);
      
            // set up the collecrtor with the time_limit
            time_limit = time_limit * 1000
            const collector = sentMessage.createReactionCollector({ filter, time: time_limit });
            let voting_array = []
      
            collector.on('collect', (reaction, user) => {
                const user_obj = {
                    user_name: user.tag,
                    reactions_used: 0
                }
                
                // Checks if the user has already voted
                const userAlreadyVoted = voting_array.find(element => element.user_name === user.tag)

                if(!userAlreadyVoted){
                    voting_array.push(user_obj)
                }

                const userIndex = voting_array.findIndex(element => element.user_name === user.tag );

                // If user is found then update the times they have voted
                if(userIndex != -1){
                    voting_array[userIndex].reactions_used =  voting_array[userIndex].reactions_used + 1
                }

                message.channel.send(`Collected a new ${reaction.emoji.name} reaction and ${user.tag} reacted`);
            });
      
            // fires when the time limit or the max is reached
            collector.on('end', (collected) => {
              // reactions are no longer collected
                // adds up total number of reactions
                let total_votes = totalRoleMembers * reaction_limit
                let total_reactions = 0
                voting_array.forEach((user_element, index) => {
                    total_reactions = user_element.reactions_used + total_reactions
                })

                // if the 👍 emoji is clicked the MAX_REACTIONS times
                    message.channel.send(`There are this many reactions ${total_reactions} with a possible total number of ${total_votes}`)
                  return message.channel.send(`No more voting!`);
            });
          } catch (error) {
            console.log(error);
          }

        
        // Seperate the args using .splice() and .join()
        // .splice() seperates to an array and .join() combines
        // Need to extract 3 variables: role, user reactions limit, time limit (secs), question
        
        // CREATE A POLL WITH LIMIT BEING TIME
        // FIND OUT HOW TO TRACK HOW MANY REACTIONS THE MESSAGE HAS GOTTEN BY A SPECIFIC USER
        // OR TRACK IT OURSELVES USING THE user.id METHOD BUT I THINK THERE'S CACHE INFO AVAILABLE
        // LIMIT USER'S ABILITY TO VOTE BASED ON TOTAL REACTIONS THEY HAVE GIVEN TO A MESSAGE

    }
}
