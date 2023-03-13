const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //if (!message.member.roles.find(r => r.name === 'roleName')) return message.channel.send('You are required to have the role: roleName');
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "You are required to have the permission ADMINISTRATOR"
    );

  if (!args[0])
    return message.channel.send("Please leave an input for the POLL");

  const pollembed = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setFooter("React to vote.")
    .setDescription(args.join(" "))
    .setTitle(`Poll Created By ${message.author.username}`);

  let pollchannel = message.guild.channels.find(`name`, "polls");
  if (!pollchannel) return message.channel.send("Couldn't find poll channel.");
  let msg = await pollchannel.send(pollembed);
  //let msg = await message.channel.send(pollembed);

  await msg.react("âœ…");
  await msg.react("âŒ");

  message.delete({ timeout: 1000 });
};

module.exports.help = {
  name: "Poll",
};
