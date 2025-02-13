import http from "http";
import dotenv from "dotenv";
import router from "./src/routers/index.routes.js";
dotenv.config();

// create a server
// SERVER
const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

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
  else console.log(`Server ${port}-portda ishga tushdi`);
});
