const Discord = require('discord.js');
const { guild } = require('../../../config.json');

module.exports = {
  name: 'ping',
  description: 'Various bot latencies',
  global: true,
  execute(message) {
    const pingEmbed = new Discord.MessageEmbed()
      .setTitle('🏓 Pong!')
      .setDescription(`**Bot:** \`Pinging...\`\n**API:** ${message.client.ws.ping}`)
      .setColor(guild.color);
    message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } }).then(msg => {
      pingEmbed.setDescription(`**Bot:** \`${msg.createdTimestamp - message.createdTimestamp} ms\`\n**API:** \`${message.client.ws.ping} ms\``);
      msg.edit({ embeds: [pingEmbed] });
    });
  },
};