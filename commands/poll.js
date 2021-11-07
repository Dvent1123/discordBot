const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'poll',
    description: 'Creates a poll',
    execute: async (client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send('You do not have ')

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
        }
        
        let question = args.slice(1).join(' ')

        if(!question) {
            return message.channel.send('You did not specify a question for your poll')

        }

        const embedPoll = new MessageEmbed()
        .setTitle('New poll')
        .setDescription(`${question}`)
        .setFooter(`${message.author.username} created this poll.`)
            
        let msg = await client.channels.cache.get(channel.id).send({embeds: [embedPoll]})
        await msg.react('👍')
        await msg.react('👎')

    }
}