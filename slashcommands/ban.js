const { SlashCommandBuilder } = require("discord.js");
// const { execute } = require("./user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a specified user.")
    .addUserOption((user) =>
      user
        .setName("user")
        .setDescription("The user you want to ban.")
        .setRequired(true)
    )
    .addStringOption((reason) =>
      reason
        .setName("reason")
        .setDescription("The reason to ban user")
        .setRequired(true)
    )
    .addStringOption((seconds) =>
      seconds
        .setName("length")
        .setDescription("Length of ban for user(in seconds)")
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.reply(`${interaction.user}`);
  },
};
