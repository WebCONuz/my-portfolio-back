import url from "url";

function getParams(req) {
  const parsedUrl = url.parse(req.url, true);
  const pathArr = parsedUrl.pathname.split("/");
  let id = pathArr.find((item) => {
    if (item.length && !isNaN(Number(item))) {
      return item;
    }
  });
  let search = null;
  let query = parsedUrl.search ? parsedUrl.query : null;
  if (query) {
    for (let item in query) {
      if (item === "search") {
        search = query[item];
        query = null;
      }
    }
  }
  return {
    query,
    search,
    id: Number(id),
  };
}

export default getParams;
