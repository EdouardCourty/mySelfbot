const { getLatestFileInFolder } = require("../data/utils");
const fs = require("fs");

const EXPORTS_FOLDER_PATH = "./data/exports/";

exports.run = (client, message, args) => {
  let lastFriendsList = getLatestFileInFolder(EXPORTS_FOLDER_PATH);

  let data = JSON.parse(fs.readFileSync(EXPORTS_FOLDER_PATH + lastFriendsList).toString());
};

exports.info = {
  name: "importfriends",
  description: "Imports the latest friends list in the /data/exports directory to the current user account."
};
