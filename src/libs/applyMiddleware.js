const applyMiddleware = (req, res, middlewaresArr, handlerFn) => {
  let index = 0;

  const next = () => {
    if (index < middlewaresArr.length) {
      middlewaresArr[index++](req, res, next);
    } else {
      handlerFn(req, res);
    }
  };

  next();
};

export default applyMiddleware;
