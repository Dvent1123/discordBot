const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'conviction',
    description: 'Creates a poll that uses conviction voting',
    execute: async (message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send('You do not have ')

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }
        
        // Seperate the args using .splice() and .join()
        // .splice() seperates to an array and .join() combines
        // Need to extra 3 variables: role, time limit (secs), how many intervals, multiplier, question
      
        // CREATE POLL WITH LIMIT BEING TIME
        // MAKE A TIMER USE setTime() function, EVERY TIME THE TIMER ENDS CHANGE THE MULTIPLIER VARIABLE
        
        // FIGURE OUT HOW TO KEEP TRACK OF WHEN THE VOTE WAS CASTED
        // AFTER X AMOUNT OF TIME USE THE MULTIPLIER TO MULTIPY THE VALUE OF THAT VOTE

    }
}
