const getAllFiles = require('../utils/getAllFiles')
const path = require('path')
require('colors')

async function kazagumoHandler(client, kazagumo) {
	try {
		const folder = path.join(__dirname, '../kazagumo/events')
		const events = getAllFiles(folder)

		for (const event of events) {
			try {
				const eventObject = require(event)
				if (
					eventObject.name &&
					typeof eventObject.name === 'string' &&
					eventObject.execute &&
					typeof eventObject.execute === 'function'
				) {
					kazagumo.on(eventObject.name, (...args) =>
						eventObject.execute(client, ...args)
					)
				} else {
					console.log(
						`[Kazagumo] Event file ${event} does not export the required structure`
							.yellow
					)
				}
			} catch (eventError) {
				console.log(
					`[Kazagumo] Error in event file ${event}:\n`.red + eventError
				)
			}
		}
		console.log('[Kazagumo] Events loaded successfully'.green)
	} catch (error) {
		console.log('[Kazagumo] Got error while loading events:\n'.red + error)
	}
}

module.exports = kazagumoHandler
