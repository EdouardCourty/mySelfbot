const { handleCommandWithClient } = require("../data/utils");
const listGuildsHandler = require("../handlers/listGuildsHandler");
const listFriendsHandler = require("../handlers/listFriendsHandler");
const exportGuildsHandler = require("../handlers/exportGuildsHandler");
const exportFriendsHandler = require("../handlers/exportFriendsHandler");
const importFriendsHandler = require("../handlers/importFriendsHandler");
const listenGuildMessagesHandler = require("../handlers/listenMessagesHandler").guildListener;
const listenDmMessagesHandler = require("../handlers/listenMessagesHandler").dmListener;
const listenChannelHandler = require("../handlers/listenMessagesHandler").channelListener;
const runClient = require("../lib/getClient");

/**
 * How to register a command:
 *
 * I.   Add an entry to the exports object.
 *      The name of the function will be the name of the command you can call on the console (terminal).
 * II.  The only param taken by this fonction is args and is typed Array<String>, containing all the console args passed in the console.
 * III. Add the runner.
 *      Running a command with the Discord Client is supported by using the handleCommandWithClient() function
 *          The params it takes are the args, and a handler.
 *          This handler will have as params a client, and the args passed in the console.
 *          This handler is basically the function that is calles when you execute the command in the console.
 *          You can specify a third param, typed as a Boolean.
 *          This param will:
 *            - If true, let the client stay alive (e.g. for events listening),
 *            - If false, kill the client at the end of the command execution (e.g for single exports)
 * IV.   Don't forget to require your handler.
 */

module.exports = {
  /** @param {Array<String>} args */
  runSelfbot: (args) => {
    runClient();
  },
  /** @param {Array<String>} args */
  listGuilds: (args) => {
     handleCommandWithClient(args, listGuildsHandler,false)
  },
  /** @param {Array<String>} args */
  listFriends: (args) => {
    handleCommandWithClient(args, listFriendsHandler, false)
  },
  /** @param {Array<String>} args */
  exportGuilds: (args) => {
    handleCommandWithClient(args, exportGuildsHandler, false)
  },
  /** @param {Array<String>} args */
  exportFriends: (args) => {
    handleCommandWithClient(args, exportFriendsHandler, false)
  },
  /** @param {Array<String>} args */
  importFriends: (args) => {
    handleCommandWithClient(args, importFriendsHandler, true)
  },
  /** @param {Array<String>} args */
  listenToGuildMessages: (args) => {
    handleCommandWithClient(args, listenGuildMessagesHandler, true)
  },
  /** @param {Array<String>} args */
  listenToDmMessages: (args) => {
    handleCommandWithClient(args, listenDmMessagesHandler, true)
  },
  /** @param {Array<String>} args */
  listenToChannel: (args) => {
    handleCommandWithClient(args, listenChannelHandler, true)
  }
};
