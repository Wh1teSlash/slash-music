const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const buttonPagination = require('../../utils/buttonPagination')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows current queue')
		.toJSON(),
	botVoiceOnly: true,
	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no player in this server.",
				ephemeral: true,
			})

		const queue = player.queue
		if (!queue || queue.size === 0) {
			return interaction.reply('There are no tracks in the queue.')
		}

		const currentTrack = queue.current
		const itemsPerPage = 10
		const pages = []

		for (let i = 0; i < queue.length; i += itemsPerPage) {
			const current = queue.slice(i, i + itemsPerPage)
			let description = `**Now Playing:**\n${currentTrack.title} - ${currentTrack.author}\n\n**Queue:**\n`
			description += current
				.map(
					(track, index) => `${i + index + 1}. ${track.title} - ${track.author}`
				)
				.join('\n')

			let embed = new EmbedBuilder()
				.setTitle(`Queue - Page ${Math.floor(i / itemsPerPage) + 1}`)
				.setDescription(description)
				.setThumbnail(currentTrack.thumbnail)
				.setColor('Blurple')

			pages.push(embed)
		}

		await buttonPagination(interaction, pages)
	},
}
