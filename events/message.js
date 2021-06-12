const fs = require('fs');
const Discord = require('discord.js');
const { bot } = require('../config.json');
const client = require('../index.js');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.name, command);
}

module.exports = {
  name: 'message',
  execute(message) {
  if (!message.content.startsWith(bot.prefix) || message.author.bot) return;

	const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
  },
};