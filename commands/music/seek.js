const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seek to a specific time")
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The time to seek to. Ex: 10s")
        .setRequired(true)
    )
    .toJSON(),
  botVoiceOnly: true,
  run: async (client, interaction) => {
    const player = client.kazagumo.getPlayer(interaction.guild.id);

    if (!player || !player.playing)
      return interaction.reply({
        content:
          "<:incorrect:1087980863859462195> There's no music playing in this server.",
        ephemeral: true,
      });

    const time = interaction.options.getInteger("time");

    if (time < 0 || time > player.queue.durationLength)
      return interaction.reply({
        content: "<:incorrect:1087980863859462195> Invalid time.",
        ephemeral: true,
      });

    player.seek(ms(time));

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setDescription(`\`✔\` Seeked to ${ms(time)}ms.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
