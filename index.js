const startServer = require(`./src/server`);
const { port, databaseUrl } = require(`./src/config`);
const connectToDB = require(`./src/db/coonect-db`);

const PORT = process.env.PORT || port;
startServer(PORT);
connectToDB(databaseUrl);
