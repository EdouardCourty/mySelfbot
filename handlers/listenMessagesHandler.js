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

module.exports.channelListener = (client, args) => {
  const channelID = args.args[0];
  const channel = client.channels.get(channelID);
  const guildName = channel.guild.name;
  console.log(`==== LISTENING FOR ALL MESSAGES ON CHANNEL NAME: ${channel.name} on ${guildName} ====`);
  client.on("message", message => {
    if (message.channel.id === args.args[0])
      formatChannelMessages(message)
        .then(console.log)
  })
};

function formatChannelMessages(message) {
  return new Promise(resolve => {
    const authorTag = message.author.tag;
    resolve(`${authorTag}: ${message.content}`)
  })
}

function formatDmMessages(message) {
  return new Promise(resolve => {
    resolve(message.author.tag + " - " + message.content)
  })
}
