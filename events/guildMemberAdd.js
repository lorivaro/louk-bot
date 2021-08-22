const Discord = require('discord.js');
const { guild } = require('../config.json');
const shortDate = require('../utils/shortDate');

module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember, client) {
		let welcomeMessage = null;
		if (guildMember.guild.id !== guild.id) return;
		if (guildMember.user.bot) return;

		let welcomeEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.displayName, guildMember.user.displayAvatarURL())
			.setColor(guild.color);
		welcomeEmbed = Object.assign(welcomeEmbed, guild.welcomeEmbed);
		welcomeMessage = await client.channels.cache.get(guild.mainChannelID).send({ content: `||${guildMember.toString()}||`, embeds: [welcomeEmbed] });

		const createdAt = shortDate(guildMember.user.createdAt);
		const joinEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL(), welcomeMessage.url)
			.setDescription(`${guildMember.user.toString()} joined \n**Created:** ${createdAt}\n**ID:** ${guildMember.user.id}`)
			.setColor('GREEN');
		client.channels.cache.get(guild.inviteChannelID).send({ embeds: [joinEmbed] });
	},
};