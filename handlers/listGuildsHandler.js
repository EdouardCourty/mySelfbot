module.exports = (client) => {
  return new Promise((resolve) => {
    console.log("======== GUILDS NAMES START ========\n");
    client.guilds.forEach(guild => {
      console.log(`  >  ${guild.name}`)
    });
    console.log("\n========= GUILDS NAMES END =========");
    resolve()
  })
};
