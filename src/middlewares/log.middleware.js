export function logger1(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} 1`);
  next();
}

export function logger2(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} 2`);
  next();
}
