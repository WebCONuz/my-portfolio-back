import applyMiddleware from "../utils/applyMiddleware.js";
import { logger } from "../middlewares/log.middleware.js";
import {
  getAll,
  getOne,
  getByQuery,
  create,
  edit,
  remove,
} from "../controllers/portfolio.controller.js";
import getParams from "../utils/getParams.js";

function portfolioRoutes(req, res) {
  applyMiddleware(req, res, [logger], function (req, res) {
    const { query, id } = getParams(req);
    // GET
    if (req.method === "GET") {
      if (id) getOne(req, res);
      else if (query) getByQuery(req, res);
      else getAll(req, res);
    }
    // POST
    else if (req.method === "POST") create(req, res);
    // PUT
    else if ((req.method === "PUT" || req.method === "PATCH") && id)
      edit(req, res);
    // DELETE
    else if (req.method === "DELETE" && id) remove(req, res);
    // OTHER
    else {
      res.writeHead(405);
      res.end();
    }
  });
}

export default portfolioRoutes;
