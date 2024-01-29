module.exports = {
	name: 'playerEmpty',
	async execute(client, player) {
		const message = player.data.get('message')

		if (message) message.delete().catch(error => null)
		player.destroy()
		global.gc()
	},
}
