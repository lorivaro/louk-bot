const Discord = require('discord.js');
const { guild } = require('../config.json');
const shortDate = require('../utils/shortDate');

module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember, client) {
		let welcomeMessage = null;
		if (guildMember.guild.id !== guild.id) return;
		if (!guildMember.bot) {
			const welcomeEmbed = new Discord.MessageEmbed()
				.addField('Welkom in Révolution!', '• Zorg ervoor dat je de <#731206630112231464> hebt gelezen.\n• Blijf up to date met Révolution in <#599235313617076235>.\n• Bekijk aankomende events in <#767461189928091678>.\n• Mocht je ook Brawl Stars spelen, stuur een screenshot van je account in <#599241180466774016> om extra roles te krijgen.')
				.setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL())
				.setThumbnail('https://i.imgur.com/erS7Qt6.gif')
				.setColor(guild.color);
			welcomeMessage = await client.channels.cache.get(guild.mainChannelID).send(`||${guildMember.toString()}||`, welcomeEmbed);
		}
		const createdAt = guildMember.user.createdAt;
		const joinEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.displayName, guildMember.user.displayAvatarURL(), welcomeMessage.url)
			.setDescription(`${guildMember.user.toString()} joined \n**Account created:** ${shortDate(createdAt)}`)
			.setColor('GREEN');
		client.channels.cache.get(guild.inviteChannelID).send(joinEmbed);
	},
};