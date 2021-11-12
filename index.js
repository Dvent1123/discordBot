require('dotenv').config()
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const prefix = '-'

const fs = require('fs')

client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('Daddy Bezos is online')
})



client.on('messageCreate' , message => {
    //if not prefixed or is bot then return
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //splits message after prefix
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args)
    }else if(command === 'poll'){
        client.commands.get('poll').execute(message, args)
    }else if(command === 'majority')
        client.commands.get('majority').execute(message, args)
    else if(command === 'conviction')
        client.commands.get('conviction').execute(message, args)
    else if(command === 'quadratic')
        client.commands.get('quadratic').execute(message, args)
})


client.login(`${process.env.TOKEN}`)