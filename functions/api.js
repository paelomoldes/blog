
function authentication(context) {
  if (context.request.headers.get("x-api-key") != context.env.API_KEY) {
    return new Response("Unauthorized", { status: 403 });
  }

  return context.next();
}

async function post(context) {
  return new Response("success")
}

export async function onRequestGet(context) {
  return new Response("data");
}

export const onRequestPost = [authentication, post];