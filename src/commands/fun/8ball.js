const Discord = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Ask a question, give it a shake, and the answer will appear!',
    execute(message, args) {
      if (args.length == '0') {
        const askEmbed = new Discord.MessageEmbed().setDescription('Try asking a question').setColor('RED');
        return message.reply({ embeds: [askEmbed], allowedMentions: { repliedUser: false } });
      }

      const responses = [
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes, definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        'Reply hazy try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        'Don\'t count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful',
      ];

      let question = args.join(' ');
      if (!question.endsWith('?')) question += '?';

      const shakeEmbed = new Discord.MessageEmbed()
        .setTitle('🎱 Magic 8 Ball 🎱')
        .setDescription(`**Q:** ${question}\n**A:**`)
        .setFooter('Shaking...')
        .setColor('BLURPLE');

      const finalEmbed = new Discord.MessageEmbed()
        .setTitle('🎱 Magic 8 Ball 🎱')
        .setDescription(shakeEmbed.description + ` ${responses[Math.floor(Math.random() * responses.length)]}`)
        .setColor('BLURPLE');

      message.reply({ embeds: [shakeEmbed], allowedMentions: { repliedUser: false } })
        .then(msg => setTimeout(() => msg.channel.messages.cache.get(msg.id) && msg.edit({ embeds: [finalEmbed] }), 3000));
    },
};