const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current track')
		.toJSON(),
	botVoiceOnly: true,
	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		const skipped = player.skip()

		if (skipped) {
			interaction.reply({ content: 'Track skipped.', ephemeral: true })
		} else {
			interaction.reply({
				content: "Couldn't skip the track.",
				ephemeral: true,
			})
		}
	},
}
