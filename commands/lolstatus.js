const request = require("request-promise");
const { getDate } = require("../data/utils");

module.exports.run = async (client, message, args) => {
  const data = await getStatus();
  const n = data.incidents.length,
      incidents = data.incidents,
      server    = {
        name: data.name,
        id  : data.id
      };

  const currentDate = getDate();

  const desc = n === 0
    ? "There is no issues for the moment."
    : `There ${n>1?"are":"is"} ${n} issue${n>1?"s":""} declared.`;

  message.channel.send({
    embed: {
      color: n===0?16769300:13107200,
      author: {
        icon_url: "https://i.imgur.com/vtxx9HO.png",
        name: `League of Legends Status for ${server.name} - ID: ${server.id}`
      },
      description: desc,
      fields: incidents.map((val, key) => {
        return {
          name: `**Incident ${key+1}**`,
          value: `**Title**: ${val.titles[key].content}\n**Started:** ${val.created_at}\n**Severity**: ${val.incident_severity}`
        }
      }),
      footer: {
        icon_url: "https://i.imgur.com/XLMKqLw.png",
        text: `Data from Riot public API.          Date: ${currentDate}`
      }
    }
  }).then(() => client.lastDidEcho = true)
    .catch(e => console.error(e));
};

module.exports.info = {
  name:"lolstatus",
  description: "Logs the League Of Legends status in the channel."
};

async function getStatus() {
  let options = {
    uri : "https://lol.secure.dyn.riotcdn.net/channels/public/x/status/euw1.json",
    json: true
  };
  return await request(options);
}
