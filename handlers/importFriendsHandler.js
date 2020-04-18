const {getLatestFileInFolder, addFriend} = require("../data/utils");

module.exports = (client) => {
  const PATH_TO_FOLDER = process.env.EXPORTS_FOLDER + "/friends";

  let usersToAdd = [];

  const actualFriendsTags = client.user.friends.map(friend => friend.tag);
  const latestFriendList = require(`.${PATH_TO_FOLDER}/${getLatestFileInFolder(PATH_TO_FOLDER)}`);

  latestFriendList.forEach(friend => {
    if (actualFriendsTags.includes(friend.tag) === false) usersToAdd.push(friend)
  });

  // This method is too fast. The rate limit triggers when used.
  // Promise.all(usersToAdd.map(user => addFriend(user.username, user.discriminator))).then(values => {
  //   console.log(values);
  // }).catch(console.error);

  let addCount = 0;

  console.log("======= IMPORTING FRIENDS FINISH =======\n");
  usersToAdd.forEach(async user => {
    await addFriend(user.username, user.discriminator)
      .then(() => {
        addCount++;
        console.log(`Added a new friend: ${user.tag}`);
        if (addCount === usersToAdd.length) {
          console.log("\n======= IMPORTING FRIENDS FINISH =======");
          process.exit();
        }
      })
      .catch(e => {
        console.error(e)
      })
  });
};
