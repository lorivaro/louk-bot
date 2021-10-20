const { bot } = require('../../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.user.tag} is Online!`);
		client.user.setPresence({ activities: bot.presence.activities, status: bot.presence.status });
	},
};