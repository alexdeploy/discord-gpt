module.exports = {
	name: 'ready',
	once: true,
    
	async execute(bot, interaction) {
		console.log(`Ready! Logged in as ${bot.user.tag}`);
	},
};