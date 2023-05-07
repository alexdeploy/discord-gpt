// Import libraries from jest
const { test, expect, describe } = require('@jest/globals');
const { Client, Collection } = require('discord.js');
const fs = require("fs");
require('dotenv').config();

const Bot = require('../src/models/Bot');

describe('Bot class', () => {

  test('can be instantiated', () => {
    const bot = new Bot();
    expect(bot).toBeDefined();
  });

  test('is an instance of Client', () => {
    const bot = new Bot();
    expect(bot).toBeInstanceOf(Client);
  });

  test('initializes "commands" property as a Collection', () => {
    const bot = new Bot();
    expect(bot.commands instanceof Collection).toBe(true);
  });

   test('throws an error if token is not provided', () => {
    const bot = new Bot();
    expect(() => bot.start()).toThrow('Token not found!');
  });
});

describe('Commands', () => {

  test('can be added to the "commands" Collection', () => {
    const bot = new Bot();
    const command = require('../src/commands/manager/info');

    bot.commands.set(command.data.name, command);

    expect(bot.commands.has(command.data.name)).toBe(true);
  });

  test('can be loaded as JSON into Discord', () => {
    const bot = new Bot();
    const command = require('../src/commands/manager/info');

    bot.commands.set(command.data.name, command);

    const commands = [command.data.toJSON()];
    const expectedCommands = [expect.objectContaining(command.data.toJSON())];
    
    expect(commands).toEqual(expectedCommands);
  });

});

describe('Events', () => {

  test('can be loaded into the Bot instance', () => {

    const bot = new Bot();
    const event = require('../src/events/ready');

    bot.on(event.name, event.execute.bind(null, bot));

    expect(bot.listenerCount(event.name)).toBe(1);
  });

});
