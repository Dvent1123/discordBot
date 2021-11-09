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
        const poll = args.splice(1).join(' ')
        if(!poll){
            return message.channel.send('You did not give a poll to send')
        }

        // .splice() seperates to an array and .join() combines
        const options = args.splice(1).join(' ')
        if(!options){
            return message.channel.send('You did not give any options to vote on')
        }

        // Need to extra 3 variables: role, time limit (secs), how many intervals, multiplier, question
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role){
            return message.channel.send('You did not mention / give a role id or name you want to give the poll to')
        }
        const timeLimit = args[0] || '60' // 60 seconds is the default
        const intervals = args[1] || '5' // 5 intervals is the default
        const multiplier = args[2] || '1' // 1 multiplier is the default
        const question = args.splice(3).join(' ')
        if(!question){
            return message.channel.send('You did not give a question to ask')
        }
      
        // CREATE POLL WITH LIMIT BEING TIME
        const embed = new MessageEmbed()
        .setTitle(question)
        .setDescription(options)
        .setColor('#0099ff')
        .setFooter(`Poll created by ${message.author.username}`)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setURL('https://discord.js.org/')
        .addField('Time Limit', timeLimit)
        .addField('Intervals', intervals)
        .addField('Multiplier', multiplier)
        .addField('Role', role)
        .addField('Channel', channel)
        .addField('Poll', poll)
        .addField('Options', options)
        .addField('Question', question)
        .addField('Created by', message.author.username)
        .addField('Created at', message.createdAt)
        .addField('Created in', message.channel.name)
        .addField('Created in id', message.channel.id)
        .addField('Created in guild', message.guild.name)
        .addField('Created in guild id', message.guild.id)
        .addField('Created in guild region', message.guild.region)
        .addField('Created in guild owner', message.guild.owner.user.username)
        .addField('Created in guild owner id', message.guild.owner.user.id)
        .addField('Created in guild owner discriminator', message.guild.owner.user.discriminator)
        .addField('Created in guild owner avatar', message.guild.owner.user.displayAvatarURL())


        // MAKE A TIMER USE setTime() function, EVERY TIME THE TIMER ENDS CHANGE THE MULTIPLIER VARIABLE
        // FIGURE OUT HOW TO KEEP TRACK OF WHEN THE VOTE WAS CASTED
        // AFTER X AMOUNT OF TIME USE THE MULTIPLIER TO MULTIPY THE VALUE OF THAT VOTE

    }
}
