export const onRequest = [
  async ({ env, next, request }) => {
    try {
      return await next();
    } catch (e) {
      return new Response(`${e.message}\n${e.stack}`, { status: 500 });
    }
  },
  async ({ next }) => {
    const response = await next().clone();
    response.headers.set('set-cookie', `csrf-token=${ crypto.randomUUID() }; Domain=paelo.pages.dev; Path=/; SameSite=Strict`);
    return response;
  }
];