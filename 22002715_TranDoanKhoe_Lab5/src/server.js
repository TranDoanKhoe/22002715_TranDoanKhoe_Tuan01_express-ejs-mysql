const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const initDB = require("./db/init");

const PORT = process.env.PORT || 3000;

async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
