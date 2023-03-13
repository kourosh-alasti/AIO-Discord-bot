const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //if (cmd === !dm);
  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("C'est pas possible!");
  let aUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  let comment = args.join(" ").slice(22);
  if (!aUser) return message.channel.send("Can't find user!");
  //if (!args[0]) return message.channel.send('Please leave a username to Decline');
  if (!args[0])
    return message.channel.send("Please leave a comment for the application");

  //args = args.split(',');

  let areportEmbed = new Discord.RichEmbed()
    .setDescription("Accept Report")
    .setColor("#4286f4")
    .addField("~ Applicant", `${aUser} with ID: ${aUser.id}`)
    .addField(
      "~ Reviewed By",
      `${message.author} with ID: ${message.author.id}`
    )
    .addField("~ Comment", comment);
  let reportschannel = message.guild.channels.find(`name`, "bot-reports");
  if (!reportschannel)
    return message.channel.send("Couldn't find reports channel.");

  const acceptembed = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setTitle("Application: [Acceptedâœ…]")
    .setDescription(`Sorry, ${aUser}`)
    .addField("~ Comments", comment)
    .setFooter(`ABot | Application Reviewed by ${message.author.username}`);

  message.delete().catch();
  aUser.send(acceptembed);
  message.channel.send(acceptembed);
  message.delete().catch((O_o) => {});
  reportschannel.send(areportEmbed);
  reportschannel.send(acceptembed);
};

module.exports.help = {
  name: "Accept",
};
