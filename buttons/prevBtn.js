const { EmbedBuilder } = require('discord.js')

module.exports = {
	customId: 'prevBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		const prevTrack = player.getPrevious(false)
		const currentTrack = player.queue.current

		if (prevTrack[0] === currentTrack)
			return interaction.reply({
				content: 'There are no previous track',
				ephemeral: true,
			})

		player.play(prevTrack[0])

		interaction.deferUpdate()
	},
}
