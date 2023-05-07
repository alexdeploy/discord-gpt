const Bot = require("./src/models/Bot");
require('dotenv').config();

const bot = new Bot();

bot.start(process.env.token);