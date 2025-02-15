import url from "url";

function getParams(req) {
  const parsedUrl = url.parse(req.url, true);
  const pathArr = parsedUrl.pathname.split("/");
  let id = pathArr.find((item) => {
    if (item.length && !isNaN(Number(item))) {
      return item;
    }
  });
  return {
    query: parsedUrl.query,
    id: Number(id),
  };
}

export default getParams;
