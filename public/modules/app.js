import { createApp } from 'https://unpkg.com/vue@3.5.38/dist/vue.global.js';
import { createRouter, createWebHistory } from 'https://unpkg.com/vue-router@5.1.0/dist/vue-router.global.js';
/* import config from './modules/config.json' with { type: 'json' } */
const config = await (await fetch('./modules/config.json')).json();
/* import index from './modules/theme/index.html' with { type: 'text' } */
const index = await (await fetch('./modules/theme/index.html')).text();

async function load(templateId) {
  let template = '', functions = {};

  templateId = templateId.replaceAll('/', '').trim();

  try {
    template = await (await fetch(`./modules/theme/${ templateId }.html`)).text();
  } catch (e) {
    console.error(e);
  }

  try {
    functions = await import(`./modules/theme/${ templateId }.js`);
  } catch (e) {
    console.error(e);
  }

  return { template, ...functions };
}


const routes = [];


for (const templateId in config.routes) {
  const path = config.routes[templateId], component = await load(templateId);

  routes.push({ path, component })
}


const app = createApp({ template: index });

app.use(createRouter({ history: createWebHistory(), routes }));
app.mount(document.body);