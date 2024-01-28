const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the player')
		.toJSON(),
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
		const stopped = player.destroy()

		if (stopped) {
			interaction.reply({ content: 'Player destroyed.', ephemeral: true })
		} else {
			interaction.reply({
				content: "Couldn't destroy the player.",
				ephemeral: true,
			})
		}
	},
}
