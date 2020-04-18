const { Client } = require("discord.js");
require("colors");
require("dotenv").config();

const testClient = new Client();
testClient.login(process.env.APPLICATION_TOKEN)
  .then(() => {
      console.log(`Successfully connetced to Discord API. UserTag is ${testClient.user.tag}`.green);
      testClient.destroy();
  })
  .catch(e => {
      console.error(`Unable to connect to the Discord API.\n${e}`.red);
      testClient.destroy();
  });