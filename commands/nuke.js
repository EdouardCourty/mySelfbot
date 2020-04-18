const { getMessages } = require("../data/utils");

module.exports.run = (client, message, args) => {
  const nbMsg = args[0];
  let done = 0;
  if (!nbMsg || !parseInt(nbMsg)) return;
  getMessages(message.channel, nbMsg).then(async messages => {
    for (let index in messages) {
      if (messages[index].author.id === client.user.id) {
        if (messages[index].deletable && done < nbMsg) await messages[index].delete()
          .then(() => {
            done++;
            console.log("Deleted", messages[index].id, "'", messages[index].content, "'", index)
          })
          .catch(err => console.log("Can't delete", messages[index].id, "'", messages[index].content, "' !", index, err));
        else console.log("Can't delete", messages[index].id, "'", messages[index].content, "' !", index);
      }
    }
  });
};

module.exports.info = {
  name:        "nuke",
  description: "Deletes the specified amount of messages in a channel"
};
