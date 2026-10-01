// nagram.dev and the www hosts only forward to the canonical site, keeping path and query.
export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    return Response.redirect(`https://nagram.app${url.pathname}${url.search}`, 301);
  },
};
