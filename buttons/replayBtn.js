const { EmbedBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
	customId: 'replayBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		const currentTrack = player.queue.current

		player.queue.add(currentTrack)

		const message = player.data.get('message')

		if (message) {
			const embed = new EmbedBuilder(message.embeds[0]).setFooter({
				text: `Tracks in queue: ${player.queue.size} | Queue duration: ${ms(
					player.queue.durationLength
				)} | Volume: ${player.volume * 100}%`,
			})
			message.edit({
				embeds: [embed],
			})
		}

		interaction.deferUpdate()
	},
}
