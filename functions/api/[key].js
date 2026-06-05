function success() {
  return new Response(null, { status: 204 });
}

async function PostPut({ params, env, next, request }) {
  await env.KV.put(params.key, await request.text());
  return next();
}

async function Delete({ params, env, next }) {
  await env.KV.delete(params.key);
  return next();
}

export async function onRequestGet({ params, env }) {
  if (params.key && params.key.startsWith("public:")) return new Response(await env.KV.get(params.key));
  else return new Response(null, { status: 404 });
}

export const onRequestPost   = [PostPut, success];
export const onRequestPut    = [PostPut, success];
export const onRequestDelete = [Delete, success];