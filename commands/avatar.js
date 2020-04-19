exports.run = (client, message, args) => {
  if (!args[0] || !message.mentions.users.first()) return;
  let profile = message.mentions.users.first();

  message.channel.send({
    embed: {
      author: {
        name     : `${profile.username}'s profile picture`,
        icon_url : profile.avatarURL
      },
      description: profile.avatarURL
    }
  }).then(() => {
    client.lastDidEcho = true;
  }).catch(e => console.error(e));
};

exports.info = {
  name       : "avatar",
  description: "Gets the avatar URL for a profile. UserMention (@user) needed as first argument."
};
