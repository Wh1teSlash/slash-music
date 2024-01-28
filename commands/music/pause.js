const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause/resume current queue')
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

		if (!player.playing) {
			player.pause(false)

			const message = player.data.get('message')
			const track = player.queue.current

			message.edit({
				embeds: [
					new EmbedBuilder(message.embeds[0]).setAuthor({
						name: 'Playing',
						iconURL: track.requester.displayAvatarURL({
							size: 1024,
							dynamic: true,
						}),
					}),
				],
			})

			interaction.reply({ content: 'Player resumed.', ephemeral: true })
			return
		}

		const paused = player.pause(true)

		const message = player.data.get('message')
		const track = player.queue.current

		message.edit({
			embeds: [
				new EmbedBuilder(message.embeds[0]).setAuthor({
					name: 'Paused',
					iconURL: track.requester.displayAvatarURL({
						size: 1024,
						dynamic: true,
					}),
				}),
			],
		})

		if (paused) {
			interaction.reply({ content: 'Player paused.', ephemeral: true })
		} else {
			interaction.reply({
				content: "Couldn't pause the player.",
				ephemeral: true,
			})
		}
	},
}
