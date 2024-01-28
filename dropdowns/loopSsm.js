const { EmbedBuilder } = require('discord.js')

module.exports = {
	customId: 'loopSsm',

	run: (client, interaction) => {
		try {
			const values = interaction.values[0]
			console.log(values)
			const player = client.kazagumo.getPlayer(interaction.guild.id)

			const message = player.data.get('message')
			const track = player.queue.current

			player.setLoop(values)

			if (values === 'none') {
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
							name: `Looped: ${values}`,
							iconURL: track.requester.displayAvatarURL({
								size: 1024,
								dynamic: true,
							}),
						}),
					],
				})
			}

			interaction.deferUpdate()
		} catch (error) {
			console.error(error)
		}
	},
}
