const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'conviction',
    description: 'Creates a poll that uses conviction voting',
    execute: async (message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send('You do not have ')

        // Guild Name
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }
        

        let argsArray = args.slice()
        const roleID = argsArray[1].slice(3, argsArray[1].length-1)
        let time_limit = parseInt(argsArray[2])
        const intervals = parseInt(argsArray[3])
        const multiplier = argsArray[4]
        const question = args.slice(5).join(' ')
        const intervals_in_seconds = Math.floor(time_limit / intervals)
        const start_time_in_seconds = Math.floor(Date.now() / 1000)
        const end_time_in_seconds = start_time_in_seconds + time_limit

        // Role
        let role = message.guild.roles.cache.get(roleID);
        message.channel.send({content: `Question: ${question}`});
        const totalRoleMembers = role.members.size


        try {
            // send a message and wait for it to be sent
            const sentMessage = await message.channel.send('New poll:\n' + question);

            const valid_reactions = ['👍', '👎'];

            // react to the sent message
            valid_reactions.forEach(element => sentMessage.react(element));

            // set up a filter to only collect reactions from the array of valid reactions
            // and don't count the bot's reaction
            const filter = (reaction, user) => valid_reactions.includes(reaction.emoji.name) && !user.bot;
      
            // set up the collecrtor with the time_limit
            time_limit = time_limit * 1000
            const collector = sentMessage.createReactionCollector({ filter, time: time_limit });
            let voting_array = []
            let totals_array = [{thumbs_up: 0}, {thumbs_down: 0}]
      
            collector.on('collect', (reaction, user) => {
                const user_obj = {
                    user_name: user.tag,
                    timeStamp: Math.floor(Date.now() / 1000),
                    emojiVote: reaction.emoji.name,
                    total_vote_value: 1
                }
                
                // Checks if the user has already voted
                const userAlreadyVoted = voting_array.find(element => element.user_name === user.tag)

                if(!userAlreadyVoted){
                    voting_array.push(user_obj)
                }

                const userIndex = voting_array.findIndex(element => element.user_name === user.tag );

                // If user is found then update the time they voted as well as the emoji
                if(userIndex != -1){
                    voting_array[userIndex].timeStamp =  Math.floor(Date.now() / 1000)
                    voting_array[userIndex].emojiVote = reaction.emoji.name
                }

                message.channel.send(`Collected a new ${reaction.emoji.name} reaction and ${user.tag} reacted`);
            });
      
            // fires when the time limit or the max is reached
            collector.on('end', (collected) => {
              // reactions are no longer collected
                // find which interval a certain vote is in
                // goes through each user in the array
                let votes = 1
                let total_votes = 0
                voting_array.forEach((user_element, index) => {
                    // iterates interval number of times
                    for(let count = 1; count < (intervals + 1); count++){
                        // checks which interval the user lands in
                        // if the user timestamp is greater than start time

                        if(user_element.timeStamp <= end_time_in_seconds - (intervals_in_seconds * count)) {
                            votes = votes * multiplier
                            voting_array[index].total_vote_value = votes
                        }
                    }

                    if(user_element.emojiVote === '👍'){
                        totals_array[0].thumbs_up = totals_array[0].thumbs_up + votes
                    } else if(user_element.emojiVote === '👎'){
                        totals_array[0].thumbs_down = totals_array[0].thumbs_down + votes
                    }
                    votes = 1
                })

                // if the 👍 emoji is clicked the MAX_REACTIONS times
                    message.channel.send(`This is how many 👍 total votes: ${totals_array[0].thumbs_up}`)
                    message.channel.send(`This is how many 👎 total votes: ${totals_array[1].thumbs_down}`)
                    message.channel.send(`Total number of unweighted votes: ${collected.size}`)
                  return message.channel.send(`No more voting!`);
            });
          } catch (error) {
            console.log(error);
          }

    }
}
