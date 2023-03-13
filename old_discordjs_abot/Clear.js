const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

module.exports.run = async (bot, message, args) => {
  //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't clear those messages");
  if (!args[0]) return message.channel.send("Nothing to clear");
  message.channel.bulkDelete(args[0]).then(() => {
    //message.channel.send(`Cleared ${args[0]}`).then(message.delete(5000)).then(message.delete().catch());
    message.delete(5000).catch();
  });
};

module.exports.help = {
  name: "Clear",
};
