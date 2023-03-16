const httpRequest = async (url, method, params = {}) => {
  let options = {
    method,

    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  switch (method) {
    case "GET":
      url += `?${new URLSearchParams(params).toString()}`;
      break;

    case "POST":
      options.body = JSON.stringify(params);
      break;
    default:
      break;
  }

  return await (
    await fetch(url, {
      ...options,
    })
  ).json();
};

export default httpRequest;
