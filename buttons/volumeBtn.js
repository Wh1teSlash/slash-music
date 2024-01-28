const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputStyle,
	TextInputBuilder,
} = require('discord.js')

module.exports = {
	customId: 'volumeBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})
		const modal = new ModalBuilder().setCustomId('volumeMdl').setTitle('Volume')

		const volumeInput = new TextInputBuilder()
			.setCustomId('volumeInput')
			.setLabel('Enter volume number')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('Ex: 100. from 1-100')
			.setRequired(true)
			.setMaxLength(3)
			.setMinLength(1)

		const row = new ActionRowBuilder()
		.addComponents(volumeInput)

		modal.addComponents(row)

		interaction.showModal(modal)
	},
}
