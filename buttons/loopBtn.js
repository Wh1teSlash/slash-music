const {
	EmbedBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} = require('discord.js')

module.exports = {
	customId: 'loopBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const embed = new EmbedBuilder()
			.setDescription('Select an option down below.')
			.setColor('Blurple')

		const row = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('loopSsm')
				.setPlaceholder('Select an option')
				.addOptions(
					new StringSelectMenuOptionBuilder()
						.setLabel('Off')
						.setValue('none')
						.setDescription('Disable loop mode.'),
					new StringSelectMenuOptionBuilder()
						.setLabel('Track')
						.setValue('track')
						.setDescription('Loop track.'),
					new StringSelectMenuOptionBuilder()
						.setLabel('Queue')
						.setValue('queue')
						.setDescription('Loop whole queue.')
				)
		)

		await interaction.reply({
			embeds: [embed],
			components: [row],
			ephemeral: true,
		})
	},
}
