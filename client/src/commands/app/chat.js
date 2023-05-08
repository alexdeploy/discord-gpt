const SlashCommand = require('../../models/SlashCommand');
const { send, chat } = require('../../utils/openai');

module.exports = {

data: new SlashCommand()
		.setName('chat')
		.setDescription('Talk with chatGPT-3.')
		.addStringOption(option =>
			option.setName('prompt')
				.setDescription('Tell me what you want.')
				.setRequired(true)),

	async execute(interaction, bot) {

		// Set the interaction to "thinking"
		await interaction.deferReply();

		// Get the prompt from the interaction
		const prompt = interaction.options.getString('prompt');

		const response = await chat(prompt);

		// Edit the interaction with the response
		await interaction.editReply(response);

	}

}