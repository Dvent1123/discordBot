const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

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
        
        // Seperate the args using .splice() and .join()
        // .splice() seperates to an array and .join() combines
        // Need to extract 3 variables: role, user reactions limit, time limit (secs), question
        
        // CREATE A POLL WITH LIMIT BEING TIME
        // FIND OUT HOW TO TRACK HOW MANY REACTIONS THE MESSAGE HAS GOTTEN BY A SPECIFIC USER
        // OR TRACK IT OURSELVES USING THE user.id METHOD BUT I THINK THERE'S CACHE INFO AVAILABLE
        // LIMIT USER'S ABILITY TO VOTE BASED ON TOTAL REACTIONS THEY HAVE GIVEN TO A MESSAGE

    }
}
