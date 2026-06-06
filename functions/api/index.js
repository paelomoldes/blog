export async function onRequestGet({ env, request }) {
  return Response.json(await env.KV.list({ prefix: env.KV_PUBLIC }));
}

export async function onRequestPost({ env, request }) {
  return Response.json(await env.KV.list({ ...await request.json(), prefix: env.KV_PUBLIC }));
}