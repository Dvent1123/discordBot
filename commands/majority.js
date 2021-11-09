// const Discord = require('discord.js')
// const { MessageEmbed } = require('discord.js')

// module.exports = {
//     name: 'majority',
//     description: 'Creates the winner being determined by majority',
//     execute: async (message, args) => {
//         if(!message.member.permissions.has('ADMINISTRATOR'))
//         return message.channel.send('You do not have Admin permission')

//         const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
//         if(!channel){
//             return message.channel.send('You did not mention / give a channel id or name you want to send a poll to')
//         }
        
//         // Seperate the args using .splice() and .join()
//         // .splice() seperates to an array and .join() combines
//         // Need to extra 3 variables: role, percentage, and question
        
        
//         // let argsArray = args.slice()
//         // const role = argsArray[1].toLowerCase()
//         // const percentage = argsArray[2]
//         // const question = argsArray.
//         // const question = args.slice(3).join(' ')

//         //if(!question) {
//             //return message.channel.send('You did not specify a question for your poll')
//         //  }
        
//         // GET TOTAL NUMBER OF PEOPLE WITH ROLE TYPE AS VARIABLE ROLE
        
// //         let role = message.guild.roles.cache.get(roleID);
// //         message.channel.send({content: `${role.members.size} members have this role!`});
// //         const totalRoleMembers = role.members.size
        
//         // RETURN OR CREATE THE NUMBER OF PEOPLE THAT MAKES MAJORITY
        
//         // const MAJORITY = MATH.floor(totalRoleMembers * (MATH.floor(percentage / 100)))
           
        
//         // CREATE THE QUESTION AND SEND TO DISCORD GUILD
// //             try {
// //             // send a message and wait for it to be sent
// //             const sentMessage = await message.channel.send('React to this!');
      
// //             // react to the sent message
// //             await sentMessage.react('👍');
      
// //             // set up a filter to only collect reactions with the 👍 emoji
// //             // and don't count the bot's reaction
// //             const filter = (reaction, user) => reaction.emoji.name === '👍' && !user.bot;
      
// //             // set up the collecrtor with the MAX_REACTIONS
// //             const collector = sentMessage.createReactionCollector({ filter, time: 15000 });
      
// //             collector.on('collect', (reaction) => {
// //               // in case you want to do something when someone reacts with 👍
// //               console.log(`Collected a new ${reaction.emoji.name} reaction`);
// //             });
      
// //             // fires when the time limit or the max is reached
// //             collector.on('end', (collected) => {
// //               // reactions are no longer collected
// //               // if the 👍 emoji is clicked the MAX_REACTIONS times
// //                 return message.channel.send(`We got this many reations: ${collected.size}`);
// //             });
// //           } catch (error) {
// //             // "handle" errors
// //             console.log(error);
// //           }
        
//         // END IS BASED ON WHEN A NUMBER OF PEOPLE REACT
//         // COULD POSSIBLY HAVE THIS AS A TIME LIMIT AS WELL
//     }
// }
