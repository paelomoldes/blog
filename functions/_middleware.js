export const onRequest = [
  async ({ env, next, request }) => {
    try {
      return await next();
    } catch (e) {
      return new Response(`${e.message}\n${e.stack}`, { status: 500 });
    }
  },
  async ({ env, request, next }) => {
    const response = (await next()).clone();
    if (request.url.startsWith('https:')) response.headers.set('strict-transport-security', 'max-age=31536000');
    response.headers.set('content-security-policy', env.ContentSecurityPolicy);
    response.headers.set('permissions-policy', env.PermissionsPolicy);
    response.headers.set('set-cookie', `csrf-token=${ crypto.randomUUID() }; Domain=paelo.pages.dev; Path=/; SameSite=Strict`);
    return response;
  }
];