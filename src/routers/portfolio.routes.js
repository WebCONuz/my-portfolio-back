import applyMiddleware from "../utils/applyMiddleware.js";
import { logger2 } from "../middlewares/log.middleware.js";
import {
  getAll,
  create,
  getOne,
  edit,
  remove,
} from "../controllers/portfolio.controller.js";

function portfolioRoutes(req, res) {
  applyMiddleware(req, res, [logger2], function (req, res) {
    // GET
    if (req.method === "GET") {
      if (req.url.match(/\/(\d+)$/)) {
        getOne(req, res);
      } else {
        getAll(req, res);
      }
    }
    // POST
    else if (req.method === "POST") create(req, res);
    // PUT
    else if (req.method === "PUT" && req.url.match(/\/(\d+)$/)) edit(req, res);
    // DELETE
    else if (req.method === "DELETE") remove(req, res);
    // OTHER
    else {
      res.writeHead(405);
      res.end();
    }
  });
}

export default portfolioRoutes;
