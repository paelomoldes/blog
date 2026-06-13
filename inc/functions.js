export async function importText(moduleName) {
  const mod = import(moduleName, { assert: { type: 'text' } });
  let keys = '';
  for (k in mod) keys+= k+'\n';
  return keys;
}

export function getCookie({ request }, name) {
  return request.headers.get('cookie')?.split('; ').find((row) => row.startsWith(`${name}=`))?.split('=')[1];
}

export function isAdmin({ env, request }) {
  return getCookie(context, '__Http-Authorization') == env.API_KEY;
}