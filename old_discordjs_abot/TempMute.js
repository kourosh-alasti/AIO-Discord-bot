const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let tomute =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!tomute) return message.channel.send("Couldn't Find that user.");
  if (tomute.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Can't Mute Them");
  let muterole = message.guild.roles.find(`name`, "muted");
  let reason = args.join(" ").slice(22);

  // Creating A role
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: [],
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  //Length of mute
  let muteTime = args[1];
  if (!muteTime) return message.reply("You didn't specify a time");

  await tomute.addRole(muterole.id);
  message.reply(`<@${tomute.id}> has been muted for ${ms(muteTime)}`);

  setTimeout(function () {
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted`);
  }, ms(muteTime));

  let tempEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#4286f4")
    .addField("Reported User", `${tomute} with ID: ${tomute.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Length", muteTime)
    .addField("Reason", reason);

  let tempchannel = message.guild.channels.find(`name`, "bot-reports");
  if (!tempchannel)
    return message.channel.send("Couldn't find reports channel.");

  message.delete().catch((O_o) => {});
  tempchannel.send(tempEmbed);
};

module.exports.help = {
  name: "Temp",
};
