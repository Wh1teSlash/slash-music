const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Lyricist } = require("@execaman/lyricist");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Get lyrics of a song.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Paste query of the song.")
        .setRequired(true)
    )
    .toJSON(),
  run: async (client, interaction) => {
    await interaction.deferReply();

    const query = interaction.options.getString("query");

    const lyrics = new Lyricist({
      plugins: [],
      saveLastResult: false,
    });

    const res = await lyrics.fetch(query, 3);

    if (!res.lyrics)
      return interaction.editReply({
        content: "<:incorrect:1087980863859462195> No lyrics found.",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`${res.info[0].value} - ${res.song.title}`)
      .setDescription(`${res.lyrics}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    if (res.lyrics.length > 4096) {
      embed.setDescription(`${res.lyrics.slice(0, 4093)}...`);
    }

    await interaction.editReply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
