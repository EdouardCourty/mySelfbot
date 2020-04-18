const exportGuildsHandler = require("../handlers/exportGuildsHandler");

exports.run = (client) => {
  exportGuildsHandler(client)
};

exports.info = {
  name: "exportguilds",
  description: "Saves the guilds list of the current user in the /data/exports directory"
};
