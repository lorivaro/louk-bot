const fs = require('fs');
const Discord = require('discord.js');
const { bot, guild } = require('../config.json');
const client = require('../index.js');
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`../commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (!message.content.startsWith(bot.prefix) || message.author.bot) return;
		const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName);

		if (!command) return;
		if (!message.guild || message.guild.id !== guild.id) {
			if (!command.global) {
				if (message.author.id !== bot.ownerID) return;
			}
    	}

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setColor('RED')
				.setDescription(`An error occured whilst executing the \`${commandName}\` command:\n\`\`\`${error.message}\`\`\``);
			message.channel.send({ embeds: [errorEmbed] });
		}
	},
};