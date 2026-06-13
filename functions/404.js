import { importText } from '../inc/functions.js';

class Theme {

  #base;

  #header;
  #footer;

  #output;

  constructor({ env }) {

    const themeName = env.THEME?.trim().split('/').join('') ?? 'default';
    this.#base = `./themes/${ themeName }`;

  }
  
  async init() {

    this.#header = await this.component('header');
    this.#footer = await this.component('footer');

    this.#output = '';

  }

  update(chunk) {
    this.#output += chunk;
    return this;
  }

  finalize() {
    return this.#output;
  }

  async component(component) {
    try {
      return await importText(`${ this.#base }/${ component }.html`);
    } catch (e) {
      return e.message;
    }
  }

  async template(id)  {
    return [`<template id="${ id }">`, this.#header, await this.component(id), this.#footer, '</template>'].join('');
  }

}


import header from '../inc/basic-components/header.html';
import app    from '../inc/basic-components/app.html';
import vue    from '../inc/basic-components/vue.html';
import script from '../inc/basic-components/script.html';
import footer from '../inc/basic-components/footer.html';

export async function onRequest(context) {
  const theme = new Theme(context), headers = new Headers();

  await theme.init();

  const output = theme
    .update(header)
    .update(await theme.component('header'))
    .update(app)
    .update(await theme.component('footer'))
    .update(await theme.template('index'))
    .update(await theme.template('404'))
    .update(script)
    .update(vue)
    .update(footer)
    .finalize();

  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('x-frame-options', 'SAMEORIGIN');
  headers.set('link', '<https://unpkg.com>; rel="preconnect"');

  return new Response(output, { headers });

}