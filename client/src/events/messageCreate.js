const { chat, moderation  } = require('../utils/openai');
const { moderationCheck } = require('../utils/security');

module.exports = {
	name: 'messageCreate',
    once: false,
    
	async execute(bot, interaction) {
        
        /**
         * Get only the first mention in the message.
         * TODO: Handle if there are more than one mention.
         */
        const mention = interaction.mentions.users.first();

        // If the message is not a mention, return nothing.
        if(!mention) return;

        // If the mention is the bot, generate a response.
        if(mention.id == bot.user.id){

            // Get the message content
            const content = interaction.content;

            // PROVISIONAL
            // If the message is not a mention, return nothing.
            // Get the user who sent the message.
            const user = interaction.author;

            // Get the prompt without the mention.
            const prompt = content.replace(`<@${bot.user.id}>`, "");

            // Set the bot is thinking with a new interaction.
            const interactionReply = await interaction.reply({ content: 'Thinking...', fetchReply: true });

            /** HERE IS WHERE THE MAGIC HAPPENS
             * TODO: Security check to prevent the bot from responding to itself.
             * TODO: Security check to prevent the bot from responding to other bots.
             * TODO: Security check to prevent the bot from responding to users with a certain role, name... (Blacklist)
             * ? Maybe this checks should be done in the client or server side??
             * ? Maybe it should be done in the request to the API?
             * @see OpenAI Safety best Practices: https://platform.openai.com/docs/guides/safety-best-practices
             */


            /**
             * MODERATE
             */
            const classification = await moderation(prompt);

            const moderationChecked = await moderationCheck(classification.data);

           // If the message violates the Content Policy, return a warning message.
            if(!moderationChecked){
                await interactionReply.edit("Your message violates OpenAI's Content Policy. Please, try again.");
                return;
            }

            // Get the response from the chatGPT-3
            const response = await chat(prompt);

            // Edit the interaction with the response
            await interactionReply.edit(response);
        };
    }
}