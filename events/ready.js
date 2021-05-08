module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.user.tag} is Online!`);
		client.user.setPresence({ activity: { name:'excellence', type:'COMPETING' }, status:'dnd' });
	},
};