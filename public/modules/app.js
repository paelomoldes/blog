import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';


const CONFIG = await (await fetch('./modules/config.json')).json(), /* import config from './modules/config.json' with { type: 'json' } */
      INDEX = 'index',
      INDEX_FALLBACK_SIGNATURE = '<!--@-->';


async function load(templateId) {
  let template = '', functions = {};

  templateId = templateId.replaceAll('/', '').trim();

  try {
    const moduleName = `${ location.origin }/modules/theme/${ templateId }.html`;
    const response = await fetch(moduleName), error = new TypeError(`Failed to fetch dynamically imported module: ${ moduleName }`);
    if (response.status != 200) throw error;
    const body = await response.text();
    if (body.startsWith(INDEX_FALLBACK_SIGNATURE)) throw error;
    template = body;
  } catch (e) {
    console.error(e);
  }

  {
    const moduleName = `${ location.origin }/modules/theme/${ templateId }.js`;
    try {
      functions = await import(moduleName);
    } catch (e) {
      console.error(new TypeError(`Failed to fetch dynamically imported module: ${ moduleName }`));
    }
  }

  return { template, ...functions };
}


const routes = [];

for (const templateId in CONFIG.routes) {
  const path = CONFIG.routes[templateId], component = await load(templateId);

  routes.push({ path, component })
}


const app = createApp(await load('index'));

app.use(createRouter({ history: createWebHistory(), routes }));
app.mount(document.body);