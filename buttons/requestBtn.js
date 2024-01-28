const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputStyle,
	TextInputBuilder,
} = require('discord.js')

module.exports = {
	customId: 'requestBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})
		const modal = new ModalBuilder()
			.setCustomId('requestMdl')
			.setTitle('Request')

		const requestInput = new TextInputBuilder()
			.setCustomId('requestInput')
			.setLabel('Enter track url or query')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('Ex: Mr.kitty - after dark')
			.setRequired(true)

		const row = new ActionRowBuilder().addComponents(requestInput)

		modal.addComponents(row)

		interaction.showModal(modal)
	},
}
