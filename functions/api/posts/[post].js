const NS = 'post';

function authentication({ env, next, request }) {
  if (request.headers.get("cookie").split('; ').find((row) => row.startsWith('__Http-Authorization='))?.split('=')[1] != env.API_KEY) return new Response(null, { status: 403 });
  return next();
}

export async function onRequestGet({ params, env }) {
  const value = await env.KV.get(`public:${NS}:${params.post}:`), options = {};
  if (value == null) options.status = 404;
  else options.headers = { "content-type": "application/json" };
  return new Response(value, options);
}

export const onRequestPut = [
  authentication,
  async ({ params, env, request }) => {
    const key = `public:${NS}:${params.post}:`;
    const status = (await env.KV.list({ prefix: key, limit: 1 })).keys[0]?.name ? 204 : 201;
    await env.KV.put(key, await request.text());
    return new Response(null, { status });
  }
];

export const onRequestDelete = [
  authentication,
  async ({ params, env }) => {
    await env.KV.delete(`public:${NS}:${params.post}:`);
    return new Response(null, { status: 204 });
  }
];