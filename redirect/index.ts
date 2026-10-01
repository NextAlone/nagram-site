// nagram.dev only forwards to the canonical site, keeping path and query.
export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    return Response.redirect(`https://nagram.app${url.pathname}${url.search}`, 301);
  },
};
