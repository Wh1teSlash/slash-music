const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js')

module.exports = {
	customId: 'pauseBtn',
	botVoiceOnly: true,

	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player.playing) {
			player.pause(false)

			const message = player.data.get('message')
			const track = player.queue.current

			const firstRow = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('loopBtn')
					.setEmoji('<:loop12:1100858090053709934>')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('prevBtn')
					.setEmoji('<:backforward:1111574632114442291>')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('pauseBtn')
					.setEmoji('<:stop:1100237060738138222>')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('skipBtn')
					.setEmoji('<:skip:1100237062306807860>')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('shuffleBtn')
					.setEmoji('<:shuffle:1111574753069768724>')
					.setStyle(ButtonStyle.Secondary)
			)

			const secondRow = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('volumeBtn')
					.setEmoji('<:volume:1100433632360923256>')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('replayBtn')
					.setEmoji('<:replay:1111578648055656502>')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('stopBtn')
					.setEmoji('<:incorrect:1087980863859462195>')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('infoBtn')
					.setEmoji('<:info:1111576459342000210>')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('requestBtn')
					.setEmoji('<:friends:1100846696952508446>')
					.setStyle(ButtonStyle.Secondary)
			)

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
				components: [firstRow, secondRow],
			})

			interaction.deferUpdate()
			return
		}

		player.pause(true)

		const message = player.data.get('message')
		const track = player.queue.current

		const firstRow = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('loopBtn')
				.setEmoji('<:loop12:1100858090053709934>')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('prevBtn')
				.setEmoji('<:backforward:1111574632114442291>')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('pauseBtn')
				.setEmoji('<:next1:1101798556563669092>')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('skipBtn')
				.setEmoji('<:skip:1100237062306807860>')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('shuffleBtn')
				.setEmoji('<:shuffle:1111574753069768724>')
				.setStyle(ButtonStyle.Secondary)
		)

		const secondRow = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('volumeBtn')
				.setEmoji('<:volume:1100433632360923256>')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('replayBtn')
				.setEmoji('<:replay:1111578648055656502>')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('stopBtn')
				.setEmoji('<:incorrect:1087980863859462195>')
				.setStyle(ButtonStyle.Danger),
			new ButtonBuilder()
				.setCustomId('infoBtn')
				.setEmoji('<:info:1111576459342000210>')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('requestBtn')
				.setEmoji('<:friends:1100846696952508446>')
				.setStyle(ButtonStyle.Secondary)
		)

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
			components: [firstRow, secondRow],
		})

		interaction.deferUpdate()
	},
}
