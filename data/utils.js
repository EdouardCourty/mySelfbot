require("colors");
const fs = require("fs");

module.exports = {
  /**
   * Connects the client to the Discord API, using the token provided in the .env file
   * @param client
   * @param {Boolean} silent
   */
  login: (client, silent = false) => {
    client.login(process.env.APPLICATION_TOKEN)
      .then(() => {
        if (!silent) console.log("Connected to Discord.".green);
      })
      .catch(e => {
        console.log(`Unable to log in. Login token is wrong or the API is unreachable.\n${e}`.red);
      });
  },
  /**
   * Load all the existing events in the `/events` directory.
   * @param client
   */
  loadEvents: (client) => {
    console.log("Loading events...".yellow);
    fs.readdirSync("./events")
      .forEach(file => {
        console.log(` > ${file} loaded !`);
        const event   = require(`../events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
      });
    console.log(`Preparing the client...`.blue);
  },
  /**
   * Load all the existing commands in the `/commands` directory.
   * @param client
   */
  loadCommands: (client) => {
    console.log("Loading commands...".yellow);
    client.commands = new Map();
    fs.readdirSync("./commands")
      .forEach(file => {
        console.log(` > ${file} loaded !`);
        let command = require(`../commands/${file}`);
        let commandName = command.info.name;
        client.commands.set(commandName, command);
      });
    client.availableCommands = [...client.commands.keys()];
  },
  /**
   * Logs the given message regarding the logLevel specified in the .env file
   * @param { Object } message
   */
  log: (message) => {
    switch (process.env.APPLICATION_LOGLEVEL) {
      case "all":
        console.log(
          message.isCommand
            ? `Command executed - Name: ${message.commandName} - Arguments: ${message.fullArgs || "none"}`
            : `Message by ${message.author.tag} - ${message.content}`
        );
        break;
      case "messagesOnly":
        if (!message.isCommand) console.log(`Message by ${message.author.tag} - ${message.content}`);
        break;
      case "commandsOnly":
        if (message.isCommand) console.log(`Command executed - Name: ${message.commandName} - Arguments: ${message.fullArgs || "none"}`);
        break;
    }
  },
  /**
   * Runs the command regarding the `message.commandName` property.
   * @param { Object } client
   * @param { Object } message
   */
  runCommand: (client, message) => {
    message.delete();
    if (!client.availableCommands.includes(message.commandName)) return;
    client.commands.get(message.commandName).run(client, message, message.args);
  },
  /**
   * Gets a specified amount of messages in a given channel.
   * @param channel
   * @param limit
   * @return {Promise<Object>}
   */
  getMessages : (channel, limit) => {
    limit = limit > 100 ? 100 : limit;
    return new Promise(async (resolve, reject) => {
      let index = 0, messages = [];
      const nbFetches = Math.ceil(limit / 100);
      for (let i = 0; i < nbFetches; i++) {
        const msgs = await channel.fetchMessages({
          limit: 100,
          before: index || null
        });
        messages = messages.concat(msgs.array());
        index = messages[messages.length - 1].id;
        console.log(nbFetches, messages.length, index);
        if (msgs.size < 100) {
          console.log("The loop finished early");
          break;
        }
      }
      console.log(messages);
      resolve(messages);
    });
  },
  /**
   * @return {String}
   */
  getDate : () => {
  let dt = new Date();
    return `${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getDate().toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`
  },
  /**
   * @param {Array<String>} args
   * @param {Function} handler
   * @param {Boolean} needsToStayAwake
   */
  handleCommandWithClient: (args, handler, needsToStayAwake = false) => {
    require("../lib/getClient").runSilent().then(client => {
      client.on("ready", async () => {
        await handler(client, args);
        if (!needsToStayAwake) process.exit();
      });
      client.on("error", e => {
        throw new Error(e)
      });
    })
  },
  /**
   * @param {String} path
   */
  createFolderIfNotExists: (path) => {
    if (fs.existsSync(path) === false) {
      fs.mkdirSync(path);
    }
  }
};
