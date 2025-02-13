import portfolioRoute from "./portfolio.routes.js";
import applyMiddleware from "../utils/applyMiddleware.js";
import setCorsHeader from "../middlewares/cors.middleware.js";
import errorHandler from "../utils/errorHandling.js";

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
    applyMiddleware(req, res, [setCorsHeader], routeFn);
  } else {
    errorHandler(res, 404, "Route Not Found");
  }
}

export default router;
