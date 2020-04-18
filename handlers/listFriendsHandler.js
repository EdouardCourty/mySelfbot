module.exports = (client) => {
  return new Promise((resolve) => {
    console.log("======== FRIENDS TAGS START ========\n");
    client.user.friends.map(friend => friend.tag).sort().forEach(tag => {
      console.log(`  >  ${tag}`)
    });
    console.log("\n========= FRIENDS TAGS END =========");
    resolve()
  })
};
