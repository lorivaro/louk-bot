const Discord = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember, client) {
		if (guildMember.guild.id !== guild.id) return;
		if (guildMember.bot) return;
		const mainChannel = await client.channels.fetch(guild.mainChannelID);
		const welcomeEmbed = new Discord.MessageEmbed()
			.addField('🇬🇧 Welcome to Révolution!', '• Be sure to read the <#731206630112231464>.\n• Stay up to date with Révolution in <#599235313617076235>.\n• Check out upcoming events in <#767461189928091678>.\n• If you happen to play Brawl Stars, provide a screenshot of your account in <#599241180466774016> for additional roles.')
			.addField('🇳🇱 Welkom in Révolution!', '• Zorg ervoor dat je de <#731206630112231464> hebt gelezen.\n• Blijf up to date met Révolution in <#599235313617076235>.\n• Bekijk aankomende events in <#767461189928091678>.\n• Mocht je ook Brawl Stars spelen, stuur een screenshot van je account in <#599241180466774016> om extra roles te krijgen.')
			.setAuthor(guildMember.displayName, guildMember.user.displayAvatarURL())
			.setThumbnail('https://i.imgur.com/erS7Qt6.gif')
			.setColor(guild.color);
		mainChannel.send(`||${guildMember.toString()}||`, welcomeEmbed);
	},
};