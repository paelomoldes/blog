const prefix = "public:";

export async function onRequestGet({ env, request }) {
  return Response.json(await env.KV.list({ prefix }));
}

export async function onRequestPost({ env, request }) {
  return Response.json(await env.KV.list({ ...await request.json(), prefix }));
}