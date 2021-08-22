const Discord = require('discord.js');
const { guild } = require('../config.json');
const shortDate = require('../utils/shortDate');

module.exports = {
	name: 'guildMemberRemove',
	async execute(guildMember, client) {
		if (guildMember.guild.id !== guild.id) return;

		const createdAt = shortDate(guildMember.user.createdAt);
    const joinedAt = shortDate(guildMember.joinedAt);
		const leaveEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL())
			.setDescription(`${guildMember.user.toString()} left \n**Created:** ${createdAt} \n**Joined:** ${joinedAt}\n**ID:** ${guildMember.user.id}`)
			.setColor('RED');
		client.channels.cache.get(guild.inviteChannelID).send({ embeds: [leaveEmbed] });
	},
};