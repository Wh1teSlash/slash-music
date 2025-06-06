const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "playerStart",
  async execute(client, player, track) {
    let source = "";
    let looped = "";

    if (track.sourceName === "spotify")
      source = "<:spotify2:1101763629633765427>";
    else if (track.sourceName === "youtube")
      source = "<:ytb:1101768846693634138>";
    else if (track.sourceName === "apple")
      source = "<:MusicApple:1217501064031637544>";
    else if (track.sourceName === "deezer")
      source = "<:deezer:1217503058855198771>";
    else if (track.sourceName === "soundcloud")
      source = "<:soundcloud:1218142801204875316>";

    if (player.loop === "none") looped = "Playing";
    else looped = `Looped: ${player.loop}`;

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setAuthor({
        name: looped,
        iconURL: track.requester.displayAvatarURL({
          size: 1024,
          dynamic: true,
        }),
      })
      .setFields([
        {
          name: "<:music:1100846700119195778> Track:",
          value: `<:1_:1100848601808244789> **${track.title}**`,
        },
        {
          name: "<:author:1111562407425347604> Author",
          value: `<:1_:1100848601808244789> **${track.author}**`,
        },
        {
          name: "<:friends:1100846696952508446> Requested by:",
          value: `<:1_:1100848601808244789> ${track.requester}`,
        },
        {
          name: "<:source:1101774575882227794> Source:",
          value: `<:1_:1100848601808244789> ${source}`,
        },
      ])
      .setThumbnail(track.thumbnail)
      .setFooter({
        text: `Tracks in queue: ${player.queue.size} | Queue duration: ${ms(
          player.queue.durationLength
        )} | Volume: ${player.volume * 100}%`,
      });

    const firstRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("loopBtn")
        .setEmoji("<:loop12:1100858090053709934>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("prevBtn")
        .setEmoji("<:backforward:1111574632114442291>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("pauseBtn")
        .setEmoji("<:stop:1100237060738138222>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("skipBtn")
        .setEmoji("<:skip:1100237062306807860>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("shuffleBtn")
        .setEmoji("<:shuffle:1111574753069768724>")
        .setStyle(ButtonStyle.Secondary)
    );

    const secondRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("volumeBtn")
        .setEmoji("<:volume:1100433632360923256>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("replayBtn")
        .setEmoji("<:replay:1111578648055656502>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("stopBtn")
        .setEmoji("<:incorrect:1087980863859462195>")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("infoBtn")
        .setEmoji("<:info:1111576459342000210>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("requestBtn")
        .setEmoji("<:friends:1100846696952508446>")
        .setStyle(ButtonStyle.Secondary)
    );

    const message = player.data.get("message");

    if (message) {
      message
        .edit({
          embeds: [embed],
        })
        .then((x) => player.data.set("message", x));
    } else {
      client.channels.cache
        .get(player.textId)
        ?.send({
          embeds: [embed],
          components: [firstRow, secondRow],
        })
        .then((x) => player.data.set("message", x));
    }
  },
};
