const {runCommand, log} = require("../data/utils");

module.exports = (client, message) => {
  message.isListened = message.author.id === client.user.id ? 1 : 0;
  message.isCommand  = message.content.startsWith(process.env.COMMAND_PREFIX) ? 1 : 0;
  const isSentByUser = message.author.id === client.user.id;

  if (!message.isListened && !message.isCommand) return;

  message.args        = message.content.split(" ");
  message.fullArgs    = message.args;
  message.commandName = message.isCommand ? message.args.shift().slice(1) : undefined;
  message.baseContent = message.isCommand ? message.content : undefined;
  message.content     = message.isCommand ? message.args.join(" ") : message.content;

  if (message.isCommand && isSentByUser) runCommand(client, message);

  if (!client.lastDidEcho) log(message);
};
