// dotenv initializer
require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const commandPath = path.join(__dirname, "commands");
const eventsPath = path.join(__dirname, "events");

const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));

const eventFiles = fs
  .readdir(eventsPath)
  .filter((file) => file.endsWith(".js"));

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(
      `No command matching ${interaction.commandName} was found. Therefore, skipping addition.`
    );
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, (bot) => {
  console.log(`Ready! Logged in as ${bot.user.tag}`);
});

client.login(process.env.CLIENT_TOKEN);
