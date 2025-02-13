import portfolioService from "../services/portfolio.js";
import url from "url";

export const getAll = async (req, res) => {
  const portfolios = await portfolioService.getAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(portfolios));
};

export const create = async (req, res) => {
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
};

export const getOne = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathArr = parsedUrl.pathname.split("/");
  let id = pathArr.find((item) => {
    if (item.length && !isNaN(Number(item))) {
      return item;
    }
  });
  console.log(id);

  const data = await portfolioService.getOne(+id);
  if (data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "OK", data }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "Not found" }));
  }
  res.end();
};

export const edit = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.pathname
    .split("/")
    .find((item) => typeof Number(item) === "number");
  const oldData = await portfolioService.getOne(+id);

  if (!oldData) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "Not found" }));
    return res.end();
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    let reqBody = JSON.parse(body);
    const editedData = await portfolioService.update(+id, reqBody);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "UPDATED", data: editedData }));
    res.end();
  });
};

export const remove = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.pathname
    .split("/")
    .find((item) => typeof Number(item) === "number");
  const oldData = await portfolioService.getOne(+id);

  if (!oldData) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "Not found" }));
    return res.end();
  }

  await portfolioService.delete(+id);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: "OK", id }));
  res.end();
};
