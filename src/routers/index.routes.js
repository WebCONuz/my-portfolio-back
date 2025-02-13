import portfolioRoute from "./portfolio.routes.js";
import applyMiddleware from "../libs/applyMiddleware.js";
import { logger1 } from "../middlewares/log.middleware.js";

// Middleware pipeline

const routes = {
  "/portfolio": portfolioRoute,
};

function router(req, res) {
  let routeFn = null;
  for (let key in routes) {
    if (req?.url?.includes(key)) {
      routeFn = routes[key];
      break;
    }
  }
  if (routeFn) {
    applyMiddleware(req, res, [logger1], routeFn);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
}

export default router;
