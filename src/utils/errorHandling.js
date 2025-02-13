function errorHandler(res, statusCode, errorMsg) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "Error", errorMsg }));
}

export default errorHandler;
