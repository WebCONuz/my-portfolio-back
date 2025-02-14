import http from "http";
import chalk from "chalk";
import dotenv from "dotenv";
import router from "./src/routers/index.routes.js";
import { createTables } from "./src/database/tables.js";
dotenv.config();

// create a server
const server = http.createServer(async (req, res) => {
  // HandShake
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // create tales
  if (req.method === "GET" && req.url === "/tables") {
    createTables();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ msg: "Tables were created successfully!" }));
  }

  // routing
  router(req, res);
});

// run the project
const port = process.env.PORT || 3001;
server.listen(port, (err) => {
  if (err) throw err;
  else console.log(chalk.green(`Server ${port}-portda ishga tushdi`));
});
