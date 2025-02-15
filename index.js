import http from "http";
import chalk from "chalk";
import dotenv from "dotenv";
import router from "./src/routers/index.routes.js";
import { createTables } from "./src/database/tables.js";
import { connectDatabase } from "./src/database/db.js";
dotenv.config();

// create a server
const server = http.createServer(async (req, res) => {
  // HandShake
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // routing
  router(req, res);
});

// run the project
const port = process.env.PORT || 3001;
server.listen(port, (err) => {
  if (err) throw err;
  else {
    console.log(
      `${chalk.green("Server is running on port:")} ${chalk.yellow(port)}`
    );
    connectDatabase();
    createTables();
  }
});
