const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, jChannel) => {
  let sbUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  let sbReason = args.join(" ").slice(22);
  if (!sbUser) return message.channel.send("Didn't Find User!");
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You don't have the permission to SoftBan");
  if (sbUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You cannot Softban this user.");

  let banEmbed = new Discord.RichEmbed()
    .setTitle("~ **SoftBan** ~")
    .setColor("#4286f4")
    .addField("**~**User**~**", sbUser)
    .addField("**~**Author**~**", message.author)
    .addField("**~**Channel**~**", message.channel)
    .addField(
      "**~**Time**~**",
      moment(message.createdAt).format(`MMMM Do YYYY, h:mm a`)
    )
    .addField("**~**Reason**~**", sbReason);

  /*let banAnnounce = new Discord.RichEmbed()
    .setColor("#606060")
    .setDescription(`User ${bUser} got SoftBanned from the server!`);*/

  let banDm = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setDescription(
      `**>>>** You got SoftBanned from ${message.guild.name}!\n**>>>** Reason: ${sbReason}\n**>>>** You can join again immediately.`
    );

  /*try {
        message.guild.channels.get(jChannel).createInvite().then(invite =>
            bUser.send(invite.url)
        );
        bUser.send(banDm);
    } catch(e) {
        console.error(e.stack);
    }*/

  let botChannel = message.guild.channels.find(`name`, "bot-reports");
  if (!botChannel)
    return message.channel.send("Couldn't find reports channel.");

  message.delete().catch((O_o) => {});
  //message.channel.send(banAnnounce).then(msg => msg.delete().catch(O_o=>{}));
  message.guild.member(sbUser).ban(sbReason);
  message.guild.unban(sbUser.id).catch((O_o) => {});
  botChannel.send(banEmbed);
  //console.log(`User ${sbUser} got SoftBanned by ${message.author}.`);
};

module.exports.help = {
  name: "Softban",
};
