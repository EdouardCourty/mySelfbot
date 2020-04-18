exports.run = async (client, message, args) => {
  let msgID     = args.shift();
  let quote     = args.join(" ");
  let quoted    = await message.channel.fetchMessage(msgID);

  message.channel.send({
    embed: {
      color : 16760320,
      author: {
        name     : quoted.author.tag,
        icon_url : quoted.author.avatarURL
      },
      description: quoted.content
    }
  }).then(message => {
    client.lastDidEcho = true;
    quoted.channel.send(quote);
  }).catch(e => console.error(e));
};

exports.info = {
  name       : "quote",
  description: "Quotes a message by referring to his ID."
};
