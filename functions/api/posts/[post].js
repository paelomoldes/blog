const NS = 'post';

function authentication({ env, next, request }) {
  if (request.headers.get("x-api-key") != env.API_KEY) return new Response(null, { status: 403 });
  return next();
}

export async function onRequestGet({ params, env }) {
  const { value, metadata } = await env.KV.getWithMetadata(`${env.KV_PUBLIC}:${NS}:${params.post}:`), options = {};
  if (value == null) options.status = 404;
  else options.headers = { "content-type": "application/json" };
  return new Response(value, options);
}

export const onRequestPut = [
  authentication,
  async ({ params, env, request }) => {
    const key = (await env.KV.list({ prefix: `${env.KV_PUBLIC}:${NS}:${params.post}:`, limit: 1 })).keys[0]?.name;
    await env.KV.put(key, await request.text());
    return new Response(null, { status: key ? 204 : 201 });
  }
];

export const onRequestDelete = [
  authentication,
  async ({ params, env }) => {
    await env.KV.delete(`${env.KV_PUBLIC}:${NS}:${params.post}:`);
    return new Response(null, { status: 204 });
  }
];