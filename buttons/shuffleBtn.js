module.exports = {
	customId: 'shuffleBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		player.queue.shuffle()

		interaction.deferUpdate()
	},
}
