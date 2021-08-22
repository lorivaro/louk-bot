module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.user.tag} is Online!`);
		client.user.setPresence({ activities: [{ name:'excellence', type:'COMPETING' }], status:'dnd' });
	},
};