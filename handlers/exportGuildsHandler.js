const fs = require("fs");
const {createFolderIfNotExists} = require("../data/utils");

module.exports = (client) => {
  const guildExportData = client.guilds.map(guild => {
    return {
      name: guild.name,
      id: guild.id,
      iconURL: guild.iconURL,
      createdAt: guild.createdAt,
      createdAtTimestamp: guild.createdTimestamp,
      bannerURL: guild.bannerURL,
      joinedAt: guild.joinedAt,
      joinedAtTimestamp: guild.joinedTimestamp,
      channels: guild.channels.map(channel => {
        return {
          id: channel.id,
          name: channel.name,
          position: channel.position,
          calculatedPosition: channel.position,
          parent: {
            name: channel.parent ? channel.parent.name : null,
            id: channel.parent ? channel.parent.id : null,
            position: channel.parent ? channel.parent.position : null
          }
        }
      }),
      roles: guild.roles.map(role => {
        return {
          name: role.name,
          id: role.id,
          color: role.color,
          permissions: role.permissions
        }
      })
    }
  });

  const PATH_TO_FOLDER = process.env.EXPORTS_FOLDER + "/guilds";
  createFolderIfNotExists(PATH_TO_FOLDER);
  const fileName = `${PATH_TO_FOLDER}/guilds-${Date.now()}.json`;

  fs.writeFileSync(fileName, JSON.stringify(guildExportData, null, 2));
};
