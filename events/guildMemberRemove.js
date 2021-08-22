const Discord = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
	name: 'guildMemberRemove',
	async execute(guildMember, client) {
		if (guildMember.guild.id !== guild.id) return;

		const createdAt = guildMember.user.createdTimestamp;
    const joinedAt = guildMember.joinedTimestamp;
		const leaveEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL())
			.setDescription(`${guildMember.user.toString()} left \n**Created:** <t:${createdAt}:d> \n**Joined:** <t:${joinedAt}:d>\n**ID:** ${guildMember.user.id}`)
			.setColor('RED');
		client.channels.cache.get(guild.inviteChannelID).send({ embeds: [leaveEmbed] });
	},
};