module.exports = {
	customId: 'stopBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		const message = player.data.get('message')

		if (message) message.delete().catch(error => null)
		player.destroy()

		interaction.deferUpdate()
	},
}
