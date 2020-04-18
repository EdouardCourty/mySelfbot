const {addFriend} = require("../data/utils");
require("dotenv").config();

const username = "TMKParis";
const discriminator = "3347";

addFriend(username, discriminator);
