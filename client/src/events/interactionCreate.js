module.exports = {
	name: 'interactionCreate',
    once: false,
    
	async execute(bot, interaction) {

		// if interaction is a command.
		if(interaction.isCommand()){

			// Get the command type from the interaction.
			const command = interaction.client.commands.get(interaction.commandName);

			// If the command doesn't exist, return nothing.
			if(!command) return;
	
			try {
				await command.execute(interaction, bot);
			} catch (err) {
				console.error(err);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
    }
}