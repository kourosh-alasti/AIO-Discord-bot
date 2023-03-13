const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    //.setDescription("~ ABot Information ~")
    .setColor("#42d1f4")
    .setThumbnail(bicon)
    .setTitle(" ABot Information")
    .addField("~Creator", ">AlastiAF#7372")
    .addField("~Developed At", ">October 11th 2018")
    .addField("~Servers", `${client.guilds.size}`)
    .setFooter("ABot | Copyright Â© 2018 ABot, all rights reserved.");

  return message.channel.send(botembed);
};

module.exports.help = {
  name: "Bot",
};
