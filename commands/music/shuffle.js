const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle current queue.')
		.toJSON(),
	botVoiceOnly: true,
	run: async (client, interaction) => {
		const player = client.kazagumo.getPlayer(interaction.guild.id)

		if (!player || !player.playing)
			return interaction.reply({
				content:
					"<:incorrect:1087980863859462195> There's no music playing in this server.",
				ephemeral: true,
			})

		const shuffled = player.queue.shuffle()

		if (shuffled) {
			interaction.reply({
				content: 'Queue shuffled succesfully.',
				ephemeral: true,
			})
		} else {
			interaction.reply({
				content: "Couldn't shuffle the queue.",
				ephemeral: true,
			})
		}
	},
}
