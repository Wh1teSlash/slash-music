require("dotenv/config");

const { Client, GatewayIntentBits } = require("discord.js");
const { Connectors } = require("shoukaku");
const { Kazagumo, KazagumoTrack, Plugins } = require("kazagumo");
const Spotify = require("kazagumo-spotify");
const eventHandler = require("./handlers/eventHandler");
const kazagumoHandler = require("./handlers/kazagumoHandler");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const kazagumo = new Kazagumo(
  {
    defaultSearchEngine: "youtube",
    send: (guildId, payload) => {
      const guild = client.guilds.cache.get(guildId);
      if (guild) guild.shard.send(payload);
    },
    plugins: [
      new Plugins.PlayerMoved(client),
      new Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_SECRET_ID,
        playlistPageLimit: 1,
        albumPageLimit: 1,
        searchLimit: 10,
        searchMarket: "US",
      }),
    ],
  },
  new Connectors.DiscordJS(client),
  config.nodes
);

kazagumo.shoukaku.on("ready", (name) =>
  console.log(`Lavalink ${name}: Ready!`)
);
kazagumo.shoukaku.on("error", (name, error) =>
  console.error(`Lavalink ${name}: Error Caught,`, error)
);

client.kazagumo = kazagumo;

Promise.all([kazagumoHandler(client, kazagumo), eventHandler(client)]);

client.login(process.env.TOKEN);
