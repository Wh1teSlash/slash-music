const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { trusted } = require("mongoose");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Paste query or link to the song.")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .toJSON(),
  runAutocomplete: async (client, interaction) => {
    const focusedValue = interaction.options.getFocused(true);

    if (!focusedValue.value) return;

    const results = await client.kazagumo.search(focusedValue.value, {
      requester: interaction.user,
      engine: "apple",
    });

    await interaction.respond(
      results.tracks.map((r) => ({
        name: `${
          r.author.length + r.title.length > 100
            ? r.title.slice(0, 97) + "..."
            : r.author + " - " + r.title
        }`,
        value: r.uri,
      }))
    );
  },
  userPermissions: [],
  botPermissions: [],
  voiceOnly: true,
  run: async (client, interaction) => {
    try {
      const query = interaction.options.getString("query");

      let player = await client.kazagumo.createPlayer({
        guildId: interaction.guild.id,
        textId: interaction.channel.id,
        voiceId: interaction.member.voice.channel.id,
        volume: 100,
      });

      let result = await client.kazagumo.search(query, {
        requester: interaction.user,
        engine: "apple",
      });
      if (!result.tracks.length)
        return interaction.reply({
          content: "No results found!",
          ephemeral: true,
        });

      if (result.type === "PLAYLIST")
        for (let track of result.tracks) player.queue.add(track);
      else player.queue.add(result.tracks[0]);

      let source = "";

      if (result.tracks[0].sourceName === "spotify")
        source = "<:spotify2:1101763629633765427>";
      else if (result.tracks[0].sourceName === "youtube")
        source = "<:ytb:1101768846693634138>";
      else if (result.tracks[0].sourceName === "apple")
        source = "<:MusicApple:1217501064031637544>";
      else if (result.tracks[0].sourceName === "deezer")
        source = "<:deezer:1217503058855198771>";
      else if (result.tracks[0].sourceName === "soundcloud")
        source = "<:soundcloud:1218142801204875316>";

      const trackEmbed = new EmbedBuilder()
        .setColor("Blurple")
        .setAuthor({
          name: "Song Added",
          iconURL: interaction.member.displayAvatarURL({
            size: 1024,
            dynamic: true,
          }),
        })
        .setFields([
          {
            name: "<:music:1100846700119195778> Track:",
            value: `<:1_:1100848601808244789> **${result.tracks[0].author} - ${result.tracks[0].title}**`,
          },
          {
            name: "<:friends:1100846696952508446> Requested by:",
            value: `<:1_:1100848601808244789> ${result.tracks[0].requester}`,
          },
          {
            name: "<:source:1101774575882227794> Source:",
            value: `<:1_:1100848601808244789> ${source}`,
          },
        ])
        .setThumbnail(result.tracks[0].thumbnail)
        .setFooter({
          text: `Tracks in queue: ${player.queue.size} | Queue duration: ${ms(
            player.queue.durationLength
          )} | Volume: ${player.volume * 100}%`,
        });

      const playlistEmbed = new EmbedBuilder()
        .setColor("Blurple")
        .setAuthor({
          name: "Playlist Added",
          iconURL: interaction.member.displayAvatarURL({
            size: 1024,
            dynamic: true,
          }),
        })
        .setFields([
          {
            name: "<:music:1100846700119195778> Playlist:",
            value: `<:1_:1100848601808244789> **${result.playlistName} | Added ${result.tracks.length} tracks**`,
          },
          {
            name: "<:friends:1100846696952508446> Requested by:",
            value: `<:1_:1100848601808244789> ${result.tracks[0].requester}`,
          },
          {
            name: "<:source:1101774575882227794> Source:",
            value: `<:1_:1100848601808244789> ${source}`,
          },
        ])
        .setThumbnail(result.tracks[0].thumbnail)
        .setFooter({
          text: `Tracks in queue: ${player.queue.size} | Queue duration: ${ms(
            player.queue.durationLength
          )} | Volume: ${player.volume * 100}%`,
        });

      if (!player.playing && !player.paused) player.play();

      const message = player.data.get("message");

      if (message) {
        const embed = new EmbedBuilder(message.embeds[0]).setFooter({
          text: `Tracks in queue: ${player.queue.size} | Queue duration: ${ms(
            player.queue.durationLength
          )} | Volume: ${player.volume * 100}%`,
        });
        message.edit({
          embeds: [embed],
        });
      }

      if (result.type === "PLAYLIST")
        return interaction.reply({
          embeds: [playlistEmbed],
          ephemeral: true,
          files: [],
        });
      else
        return interaction.reply({
          embeds: [trackEmbed],
          ephemeral: true,
          files: [],
        });
    } catch (error) {
      console.error(error);
    }
  },
};
