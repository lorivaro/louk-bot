const Discord = require('discord.js');
const { guild } = require('../../config.json');

module.exports = {
    name: 'ping',
    description: 'Measures the time it takes to receive a message.',
    global: true,
    execute(message) {
      const pingEmbed = new Discord.MessageEmbed().setDescription(`🏓 Pong! \`${(Date.now() - message.createdTimestamp)} ms\``).setColor(guild.color);
      return message.channel.send(pingEmbed);
    },
};