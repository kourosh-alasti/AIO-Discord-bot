// dotenv initializer
require("dotenv").config();

const fs = require("node:fs");

const { REST, Routes } = require("discord.js");

const commands = [];
const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN);
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (err) {
    console.error(err);
  }
})();
