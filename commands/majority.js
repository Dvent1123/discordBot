const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'majority',
    description: 'Creates the winner being determined by majority',
    execute: async (message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send('You do not have Admin permission')

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }
        
        // Seperate the args using .splice() and .join()
        // .splice() seperates to an array and .join() combines
        // Need to extra 3 variables: role, percentage, and question
        
        // GET TOTAL NUMBER OF PEOPLE WITH ROLE TYPE AS VARIABLE ROLE
        // RETURN OR CREATE THE NUMBER OF PEOPLE THAT MAKES MAJORITY
        
        // CREATE THE QUESTION AND SEND TO DISCORD GUILD
        // END IS BASED ON WHEN A NUMBER OF PEOPLE REACT
        // COULD POSSIBLY HAVE THIS AS A TIME LIMIT AS WELL
    }
}
