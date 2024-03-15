require("colors");
const mongoose = require("mongoose");
const mongoURI = process.env.DB_URI;

module.exports = async (client) => {
  console.log(`${client.user.username} is online.`.blue);
  if (!mongoURI) return;
  mongoose.set("strictQuery", true);

  if (await mongoose.connect(mongoURI)) {
    console.log(`Connected to the MongoDB database.`.green);
  }

  setTimeout(() => {
    client.user.setPresence({
      activities: [
        {
          name: `${client.guilds.cache.size} Guild's`,
          type: 2,
        },
      ],
    });
  }, 30_000);
};
