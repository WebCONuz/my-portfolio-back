import chalk from "chalk";

export function logger(req, res, next) {
  console.log(
    `[${chalk.green(new Date().toISOString())}] ${chalk.yellow(
      req.method
    )} ${chalk.green(req.url)}`
  );
  next();
}
