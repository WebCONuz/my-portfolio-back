import chalk from "chalk";
function errorHandler(res, statusCode, errorMsg) {
  console.log(chalk.red(errorMsg));
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "Error", errorMsg }));
}

export default errorHandler;
