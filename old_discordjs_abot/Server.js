const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let uicon = message.author.displayAvatarURL;
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
    .setTitle("Server Info")
    .setColor("#4286f4")
    .setThumbnail(sicon)
    //.setThumbnail(uicon)
    .addField("Server Name", message.guild.name)
    .addField("Creation Date", message.guild.createdAt)
    .addField("Date You Joined", message.member.joinedAt)
    .addField("Total Member Count", message.guild.memberCount)
    .addField("Server Owner", message.guild.author);

  return message.channel.send(serverembed);
};

module.exports.help = {
  name: "Server",
};
