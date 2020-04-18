module.exports.guildListener = (client, args) => {
  client.on("message", message => {
    if (message.channel.type === "text")
    formatGuildMessages(message)
      .then(console.log)
  })
};

module.exports.dmListener = (client, args) => {
  client.on("message", message => {
    if (message.channel.type === "dm" || message.channel.type === "group")
    formatDmMessages(message)
      .then(console.log)
  })
};

function formatGuildMessages(message) {
  return new Promise(resolve => {
    resolve(message.content)
  })
}


function formatDmMessages(message) {
  return new Promise(resolve => {
    resolve(message.author.tag + " - " + message.content)
  })
}
