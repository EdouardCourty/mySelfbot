const instagram = require("user-instagram");

exports.run = (client, message, args) => {
  const username = args.shift();

  instagram(username)
    .then(data => {
      let totalLikes = 0;
      data.posts.forEach(post => {
        totalLikes += post.likesCount
      });
      let averageLikeCount = Math.round(totalLikes / data.posts.length);
      message.channel.send({
        embed: {
          color: 15286359,
          author: {
            name: `${data.username}'s Instagram profile`,
            url: data.link,
            icon_url: "https://i.imgur.com/12bLY5g.png"
          },
          thumbnail: {
            url: data.profilePic
          },
          fields: [
            {
              name: "__Biography__",
              value: data.biography
            },
            {
              name: "__Subscribers - Subscriptions__",
              value: `**${data.subscribersCount}** followers\nFollowing **${data.subscribtions}** accounts`
            },
            {
              name: "__Posts & Likes__",
              value: `**${data.postsCount}** posts\n**${totalLikes}** likes\n**~${averageLikeCount}** avg. likes`
            }
          ]
        }
      })
    })
    .catch(console.error)
};

exports.info = {
  name: "instagram",
  description: "Gives some information about the username provided"
};
