const { EmbedBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
	customId: 'volumeMdl',

	run: async (client, interaction) => {
		const volumeInput = interaction.fields.getTextInputValue('volumeInput')
		const player = client.kazagumo.getPlayer(interaction.guild.id)
		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		const number = parseInt(volumeInput)

		if (number >= 1 && number <= 100) {
			player.setVolume(number)

			const message = player.data.get('message')

			message.edit({
				embeds: [
					new EmbedBuilder(message.embeds[0]).setFooter({
						text: `Tracks in queue: ${player.queue.size} | Queue duration: ${ms(
							player.queue.durationLength
						)} | Volume: ${player.volume * 100}%`,
					}),
				],
				files: [],
			})

			interaction.deferUpdate()
		} else
			interaction.reply({
				content:
					'<:incorrect:1087980863859462195> Please provide number from 1 to 100.',
				ephemeral: true,
			})
	},
}
