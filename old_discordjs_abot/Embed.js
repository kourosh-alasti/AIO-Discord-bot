const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("C'est pas possible!");
  if (!args[0])
    return message.channel.send("Please leave a message for me to Say");

  const sayembed = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setDescription(args.join(" "));

  message.delete().catch();
  message.channel.send(sayembed);
  /*let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);*/
};

module.exports.help = {
  name: "Embed",
};
