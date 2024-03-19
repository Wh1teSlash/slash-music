const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const buttonPagination = require("../../utils/buttonPagination.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get list of all bot commands.")
    .toJSON(),
  run: async (client, interaction) => {
    try {
      const commandFolders = fs.readdirSync("./commands");
      const helpEmbeds = [];

      for (const commandFolder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${commandFolder}`);

        const categoryEmbed = new EmbedBuilder()
          .setColor("Blurple")
          .setTitle(
            `${commandFolder.charAt(0).toUpperCase() + commandFolder.slice(1)}`
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp()
          .setFooter({
            text: "Requested by " + interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({
              size: 1024,
              dynamic: true,
            }),
          });

        const subcommands = [];

        for (const file of commandFiles) {
          const command = require(`./../${commandFolder}/${file}`);

          if (command.deleted) {
            continue;
          }

          const description = `${
            command.data.description || "No description available"
          }`;

          if (
            command.data.type === "SUB_COMMAND" ||
            command.data.type === "SUB_COMMAND_GROUP"
          ) {
            subcommands.push(command);
          } else {
            categoryEmbed.addFields({
              name: `/${command.data.name}`,
              value: description,
            });
          }
        }

        if (subcommands.length > 0) {
          categoryEmbed.addFields({
            name: "Subcommands",
            value: subcommands
              .map((subcommand) => `/${subcommand.data.name}`)
              .join("\n"),
          });
        }

        helpEmbeds.push(categoryEmbed);
      }

      await buttonPagination(interaction, helpEmbeds);
    } catch (error) {
      console.error(error);
    }
  },
};
