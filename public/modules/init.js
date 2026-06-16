import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// import config from './modules/config.json' with { type: 'json' }
const config = await (await fetch('./modules/config.json')).json()


const INDEX_FALLBACK_SIGNATURE = '<!--/-->',
      THEME_INDEX              = 'index',
      THEME_STYLE              = 'style'


function moduleNameHtml(templateId) {
  return `${ location.origin }/modules/theme/${ templateId }.html`
}

function moduleNameJs(templateId) {
  return `${ location.origin }/modules/theme/${ templateId }.js`
}

function moduleNameCss(templateId) {
  return `${ location.origin }/modules/theme/${ templateId }.css`
}

async function load(templateId) {
  let template = '', functions = {}

  try {
    const moduleName = moduleNameHtml(templateId)
    const response   = await fetch(moduleName),
          error      = new TypeError(`Failed to fetch dynamically imported module: ${ moduleName }`)

    if (response.status != 200) throw error

    const body = await response.text()

    if (body.startsWith(INDEX_FALLBACK_SIGNATURE)) throw error

    template = body
  } catch (e) { console.error(e) }

  {
    const moduleName = moduleNameJs(templateId)
    try {
      functions = await import(moduleName)
    } catch (e) {
      console.error(new TypeError(`Failed to fetch dynamically imported module: ${ moduleName }`))
    }
  }

  template = functions.template || template

  if (template) template = `<link href="${ moduleNameCss(templateId) }" rel="stylesheet">` + template

  return { ...functions, template }
}


const routes = []

for (let templateId in config.routes) {

  const path = config.routes[templateId]

  templateId = templateId.replaceAll('/', '').trim().toLowerCase()

  if (templateId === THEME_INDEX) continue
  if (templateId === THEME_STYLE) continue

  const component = () => load(templateId)

  routes.push({ path, component })

  {
    const preload = document.createElement('link')
    preload.rel = 'preload'
    preload.href = moduleNameHtml(templateId)
    preload.as = 'fetch'
    preload.fetchPriority = 'low'
    document.head.appendChild(preload)
  }

  {
    const preload = document.createElement('link')
    preload.rel = 'modulepreload'
    preload.href = moduleNameJs(templateId)
    document.head.appendChild(preload)
  }

  {
    const preload = document.createElement('link')
    preload.rel = 'preload'
    preload.href = moduleNameCss(templateId)
    preload.as = 'style'
    document.head.appendChild(preload)
  }
}


const app = createApp(await load(THEME_INDEX))

app.use(createRouter({ history: createWebHistory(), routes }))
app.mount(document.body)