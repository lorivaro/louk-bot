const Discord = require('discord.js');
const { guild } = require('../config.json');
const shortDate = require('../utils/shortDate');

module.exports = {
	name: 'guildMemberRemove',
	async execute(guildMember, client) {
		if (guildMember.guild.id !== guild.id) return;
    let lastMessageURL = null;
    if (guildMember.lastMessageID) {
      const lastMessage = await client.channels.cache.get(guildMember.lastMessageChannelID).messages.fetch(guildMember.lastMessageID);
			lastMessageURL = lastMessage.url;
    }
		const createdAt = guildMember.user.createdAt;
    const joinedAt = guildMember.joinedAt;
		const leaveEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL(), lastMessageURL)
			.setDescription(`${guildMember.user.toString()} left \n**Account created:** ${shortDate(createdAt)} \n**User joined:** ${shortDate(joinedAt)}`)
			.setColor('RED');
		client.channels.cache.get(guild.inviteChannelID).send(leaveEmbed);
	},
};