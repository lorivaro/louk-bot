const fs = require('fs');
const { Client, Intents } = require('discord.js');
require('dotenv').config();
const client = new Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	intents: Object.values(Intents.FLAGS),
});
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(process.argv[2] === 'live' ? process.env.token : process.env.testToken);