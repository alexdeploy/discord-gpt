const SlashCommand = require('../../models/SlashCommand');
const { EmbedBuilder } = require('discord.js');

module.exports = {

data: new SlashCommand()
		.setName('info')
		.setDescription('Show info about how to use DiscordGPT'),

	async execute(interaction, bot) {

		// Set the interaction to "thinking"
		await interaction.deferReply();

        console.log(bot);

        const message = `
        
**DiscordGPT** is a Discord bot that uses the OpenAI API to chat with you. It is based on the [chatGPT-3.5-turbo] model.

**🚀 Usage**

1. Mention the bot with "@" by its name, followed by what you want to ask it.
   Example: \`@${bot.user.username} What is the meaning of life?\`

2. Wait for the bot to respond.

**🔧 Utilities**

Comming soon...

`
        const response = new EmbedBuilder()
            .setTitle('ℹ️ DiscordGPT')
            .setDescription(message)
            .setFooter({text:`Developed by @alexdeploy`})

		// Edit the interaction with the response
		await interaction.editReply({ embeds: [response]});

	}

}