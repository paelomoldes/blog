async function getResponse({ params, env }, cache = false) {
  const value = await env.KV.get(params.key, { cacheTtl: cache ? Number(env.KV_CACHETTL) : 30 }), options = {};
  if (value == null) options.status = 404;
  else options.headers = { "Cache-Control": cache ? "max-age=" + env.KV_CACHETTL : "no-store" };
  return new Response(value, options);
}

function authentication({ env, next, request }) {
  if (request.headers.get("x-api-key") != env.API_KEY) return new Response(null, { status: 403 });
  return next();
}

function success() {
  return new Response(null, { status: 204 });
}

async function GetPublic(context) {
  if (context.params.key.startsWith(context.env.KV_PUBLIC)) return getResponse(context, true);
  else return context.next();
}

async function GetPrivate(context) {
  return getResponse(context);
}

async function PostPut({ params, env, next, request }) {
  await env.KV.put(params.key, await request.text());
  return next();
}

async function Delete({ params, env, next }) {
  await env.KV.delete(params.key);
  return next();
}

export const onRequestGet    = [GetPublic, authentication, GetPrivate];
export const onRequestPost   = [authentication, PostPut, success];
export const onRequestPut    = [authentication, PostPut, success];
export const onRequestDelete = [authentication, Delete, success];