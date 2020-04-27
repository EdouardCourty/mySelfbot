const Discord = require("discord.js");
const utils = require("../data/utils.js");
const handleConfig = require("../handlers/handleConfig");

module.exports = () => {
  return new Promise((resolve) => {
    let client = new Discord.Client();

    utils.login(client);
    utils.loadEvents(client);
    utils.loadCommands(client);
    handleConfig(client);

    resolve(client);
  })
};

module.exports.runSilent = () => {
  return new Promise((resolve) => {
    let client = new Discord.Client();

    utils.login(client, true);
    handleConfig(client);

    resolve(client);
  })
};
