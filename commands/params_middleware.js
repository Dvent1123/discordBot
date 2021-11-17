const getParams = function (message, args) {
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    let argsArray = args.slice()
    const roleID = argsArray[1].slice(3, argsArray[1].length-1)
    let time_limit = parseInt(argsArray[2])
    const question = args.slice(3).join(' ')

    return {
        channel: channel,
        roleID: roleID,
        time_limit: time_limit,
        question: question
    };
};

module.exports = {
    getParams: getParams
};