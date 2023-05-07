const { SlashCommandBuilder } = require('discord.js');

class SlashCommand extends SlashCommandBuilder {
    constructor(options) {
        super(options);
    }
}

module.exports = SlashCommand;