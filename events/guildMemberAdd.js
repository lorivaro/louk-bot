const Discord = require('discord.js');
const { guild } = require('../config.json');
const shortDate = require('../utils/shortDate');

module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember, client) {
		let welcomeMessage = null;
		if (guildMember.guild.id !== guild.id) return;
		if (!guildMember.user.bot) {
			let welcomeEmbed = new Discord.MessageEmbed()
				.setAuthor(guildMember.displayName, guildMember.user.displayAvatarURL())
				.setColor(guild.color);
			welcomeEmbed = Object.assign(welcomeEmbed, guild.welcomeEmbed);
			welcomeMessage = await client.channels.cache.get(guild.mainChannelID).send(`||${guildMember.toString()}||`, welcomeEmbed);
		}
		const createdAt = guildMember.user.createdAt;
		const joinEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL(), welcomeMessage.url)
			.setDescription(`${guildMember.user.toString()} joined \n**Account created:** ${shortDate(createdAt)}`)
			.setColor('GREEN');
		client.channels.cache.get(guild.inviteChannelID).send(joinEmbed);
	},
};