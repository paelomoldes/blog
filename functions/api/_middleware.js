
async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response("Error", { status: 500 });
  }
}

function authentication(context) {
  if (context.request.headers.get("x-api-key") != context.env.API_KEY) {
    return new Response("Unauthorized", { status: 403 });
  }

  return context.next();
}

export const onRequest = [errorHandling, authentication];
