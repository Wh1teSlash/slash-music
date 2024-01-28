require("colors");

const { EmbedBuilder } = require("discord.js");
const { developersId, testServerId } = require("../../config.json");
const mConfig = require("../../messageConfig.json");
const getDropdowns = require("../../utils/getDropdowns");

module.exports = async (client, interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  const dropdowns = getDropdowns();

  try {
    const dropdownObject = dropdowns.find(
      (dropdown) => dropdown.customId === interaction.customId
    );
    if (!dropdownObject) return;

    if (dropdownObject.devOnly) {
      if (!developersId.includes(interaction.member.id)) {
        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.commandDevOnly}`);
        interaction.reply({ embed: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (dropdownObject.testMode) {
      if (interaction.guild.id !== testServerId) {
        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.commandTestMode}`);
        interaction.reply({ embed: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (dropdownObject.userPermissions?.length) {
      for (const permission of dropdownObject.userPermissions) {
        if (interaction.member.permissions.has(permission)) {
          continue;
        }
        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.userNoPermissions}`);
        interaction.reply({ embed: [rEmbed], ephemeral: true });
        return;
      }
    }

    if (dropdownObject.botPermissions?.length) {
      for (const permission of dropdownObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (bot.permissions.has(permission)) {
          continue;
        }
        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.botNoPermissions}`);
        interaction.reply({ embed: [rEmbed], ephemeral: true });
        return;
      }
    }

    await dropdownObject.run(client, interaction);
  } catch (err) {
    `[ERROR] An error occured:\n ${err}`.red;
  }
};
