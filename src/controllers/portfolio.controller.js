import portfolioService from "../services/portfolio.js";
import errorHandler from "../utils/errorHandling.js";
import getParams from "../utils/getParams.js";

export const getAll = async (req, res) => {
  try {
    const portfolios = await portfolioService.getAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(portfolios));
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export const getByQuery = async (req, res) => {
  try {
    const { query } = getParams(req);
    const portfolios = await portfolioService.getByQuery(query);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(portfolios));
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = getParams(req);
    const data = await portfolioService.getOne(id);
    if (!data) return errorHandler(res, 404, "Not found");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "OK", data }));
    res.end();
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export const create = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      const newPortfolio = JSON.parse(body);
      const result = await portfolioService.create(newPortfolio);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export const edit = async (req, res) => {
  try {
    const { id } = getParams(req);
    const oldData = await portfolioService.getOne(id);
    if (!oldData) return errorHandler(res, 404, "Not found");

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      let reqBody = JSON.parse(body);
      const editedData = await portfolioService.update(id, {
        project_name: reqBody.project_name || oldData.project_name,
        thumbnail: reqBody.thumbnail || oldData.thumbnail,
        category: reqBody.category || oldData.category,
        project_info: reqBody.project_info || oldData.project_info,
        project_link: reqBody.project_link || oldData.project_link,
        is_active:
          reqBody.is_active !== undefined
            ? reqBody.is_active
            : oldData.is_active,
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ status: "UPDATED", data: editedData }));
      res.end();
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = getParams(req);
    const oldData = await portfolioService.getOne(id);
    if (!oldData) errorHandler(res, 404, "Not found");

    await portfolioService.delete(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "OK", id }));
    res.end();
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};
