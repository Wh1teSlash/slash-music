const client = require("../../index.js");

module.exports = async (oldState, newState) => {
  if (!newState?.guild) return;

  const player = client.kazagumo.getPlayer(newState.guild.id);

  if (!player) return;

  if (
    newState.channelId == null &&
    newState.member?.user.id === client.user?.id
  ) {
    player.voiceId !== null ? player.destroy() : true;
  }
};
