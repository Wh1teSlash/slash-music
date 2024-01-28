const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loops current track or queue')
		.addStringOption(option =>
			option
				.setName('option')
				.setDescription('Choice what should be looped')
				.setRequired(true)
				.addChoices(
					{ name: 'Off', value: 'none' },
					{ name: 'Track', value: 'track' },
					{ name: 'Queue', value: 'queue' }
				)
		)
		.toJSON(),
	botVoiceOnly: true,
	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)
		const option = interaction.options.getString('option')

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		if (option.includes(['none', 'track', 'queue']))
			return interaction.reply({
				content: '<:incorrect:1087980863859462195> Wrong option provided.',
				ephemeral: true,
			})

		player.setLoop(option)

		const message = player.data.get('message')
		const track = player.queue.current

		if (option === 'none') {
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
		} else {
			message.edit({
				embeds: [
					new EmbedBuilder(message.embeds[0]).setAuthor({
						name: `Looped: ${option}`,
						iconURL: track.requester.displayAvatarURL({
							size: 1024,
							dynamic: true,
						}),
					}),
				],
			})
		}

		interaction.reply({
			content: 'Loop succesfully applied',
			ephemeral: true,
		})
	},
}
