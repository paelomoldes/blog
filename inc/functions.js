export function importText(moduleName) {
  return import(moduleName, { assert: { type: 'text' } });
}

export function getCookie({ request }, name) {
  return request.headers.get('cookie')?.split('; ').find((row) => row.startsWith(`${name}=`))?.split('=')[1];
}

export function isAdmin({ env, request }) {
  return getCookie(context, '__Http-Authorization') == env.API_KEY;
}