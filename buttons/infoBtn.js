const { EmbedBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
	customId: 'infoBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		const currentTrack = player.queue.current

		const embed = new EmbedBuilder()
			.setColor('Blurple')
			.setTitle('Now Playing')
			.setThumbnail(currentTrack.thumbnail)
			.setDescription(
				`[${currentTrack.author} - ${currentTrack.title}](${currentTrack.uri})`
			)
			.setFooter({
				text: `Track length: ${ms(currentTrack.length)}`,
			})

		interaction.reply({
			embeds: [embed],
			ephemeral: true,
		})
	},
}
