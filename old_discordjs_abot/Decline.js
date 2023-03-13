const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("C'est pas possible!");
  let dUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  let comment = args.join(" ").slice(22);
  if (!dUser) return message.channel.send("Can't find user!");
  //if (!args[0]) return message.channel.send('Please leave a username to Decline');
  if (!args[1])
    return message.channel.send("Please leave a comment for the application");

  //args = args.split(',');

  let dreportEmbed = new Discord.RichEmbed()
    .setDescription("Decline Report")
    .setColor("#4286f4")
    .addField("~ Applicant", `${dUser} with ID: ${dUser.id}`)
    .addField(
      "~ Reviewed By",
      `${message.author} with ID: ${message.author.id}`
    )
    .addField("~ Comment", comment);
  let reportschannel = message.guild.channels.find(`name`, "bot-reports");
  if (!reportschannel)
    return message.channel.send("Couldn't find reports channel.");

  const declineembed = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setTitle("Application: [DeniedâŒ]")
    .setDescription(`Sorry, ${dUser}`)
    .addField("~ Comments", comment)
    .setFooter(`ABot | Application Reviewed by ${message.author.username}`);

  message.delete().catch();
  dUser.send(declineembed);
  message.channel.send(declineembed);
  message.delete().catch((O_o) => {});
  reportschannel.send(dreportEmbed);
  reportschannel.send(declineembed);
};

module.exports.help = {
  name: "Decline",
};
