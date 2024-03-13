const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Turn on autoplay mode"),
  botVoiceOnly: true,
  run: async (client, interaction) => {
    const player = client.kazagumo.getPlayer(interaction.guild.id);
    const enabled = interaction.options.getBoolean("enabled");

    if (!player || !player.playing)
      return interaction.reply({
        content:
          "<:incorrect:1087980863859462195> There's no music playing in this server.",
        ephemeral: true,
      });

    if (player.data.get("autoplay")) {
      await player.data.set("autoplay", false);
      await player.queue.clear();

      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`\`✔\` Autoplay successfully disabled.`);

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } else {
      const identifier = player.queue.current.identifier;
      const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
      const res = await player.search(search, { requester: interaction.user });
      if (!res.tracks.length)
        return interaction.reply(
          `Engine \`${player.queue.current.sourceName}\` not support!`
        );

      await player.data.set("autoplay", true);
      await player.data.set("requester", interaction.user);
      await player.data.set("identifier", identifier);
      await player.queue.add(res.tracks[1]);

      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`\`✔\` Autoplay successfully enabled.`);

      return interaction.reply({ embeds: [embed] });
    }
  },
};
