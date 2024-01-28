const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set volume to the player')
		.addIntegerOption(option =>
			option
				.setName('number')
				.setDescription('The number which will be applied to player')
				.setMinValue(1)
				.setMaxValue(100)
				.setRequired(true)
		)
		.toJSON(),
	botVoiceOnly: true,
	run: async (client, interaction) => {
		try {
			const player = client.kazagumo.getPlayer(interaction.guild.id)
			const number = interaction.options.getInteger('number')

			if (!player || !player.playing)
				return interaction.reply({
					content:
						"<:incorrect:1087980863859462195> There's no music playing in this server.",
					ephemeral: true,
				})

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
			})

			await interaction.reply({
				content: 'Volume successfully applied.',
				ephemeral: true,
			})
		} catch (error) {
			console.error(error)
			return interaction.reply({
				content: 'Something went wrong..',
				ephemeral: true,
			})
		}
	},
}
