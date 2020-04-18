require("colors");
const fs = require("fs");

module.exports = {
  /**
   * Connects the client to the Discord API, using the token provided in the .env file
   * @param client
   */
  login: (client) => {
    client.login(process.env.APPLICATION_TOKEN)
      .then(() => {
        console.log("Connected to Discord.".green);
      })
      .catch(e => {
        console.log(`Unable to log in. Login token is wrong or the API is unreachable.\n${e}`.red);
      });
  },
  /**
   * Load all the existing events in the `/events` directory.
   * @param client
   */
  loadEvents: (client) => {
    console.log("Loading events...".yellow);
    fs.readdirSync("./events")
      .forEach(file => {
        console.log(` > ${file} loaded !`);
        const event   = require(`../events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
      });
    console.log(`Preparing the client...`.blue);
  },
  /**
   * @return { string }
   */
  getDate : () => {
  let dt = new Date();
    return `${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getDate().toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`
  }
};