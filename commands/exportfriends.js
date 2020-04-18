const exportFriendsHandler = require("../handlers/exportFriendsHandler");

exports.run = (client) => {
  exportFriendsHandler(client)
};

exports.info = {
  name: "exportfriends",
  description: "Saves the friends list of the current user in the /data/exports directory"
};
