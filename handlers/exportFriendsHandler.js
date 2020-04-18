const fs = require("fs");
const {createFolderIfNotExists} = require("../data/utils");

module.exports = (client, args) => {
  const friendsExportData = client.user.friends.map(friend => {
    return {
      tag: friend.tag,
      username: friend.username,
      discriminator: friend.discriminator,
      id: friend.id,
      avatarURL: friend.avatarURL,
      createdAt: friend.createdAt,
      createdAtTimestamp: friend.createdTimestamp,
      note: friend.note
    }
  });

  const PATH_TO_FOLDER = process.env.EXPORTS_FOLDER + "/friends";

  createFolderIfNotExists(PATH_TO_FOLDER);

  const fileName = `${PATH_TO_FOLDER}/friends-${Date.now()}.json`;

  fs.writeFileSync(fileName, JSON.stringify(friendsExportData, null, 2));
};
