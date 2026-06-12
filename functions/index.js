class Theme {

  #root;

  #header;
  #footer;

  constructor({ env }) {

    {
      const themeName = env.THEME?.trim().split('/').join('');
      this.#root = themeName ? `../themes/${ themeName }` : '../inc/theme-fallback';
    }

    this.#header = this.component('header');
    this.#footer = this.component('footer');

  }

  async component(component) {
    try {
      return await import(`${ this.#root }/${ component }.html`);
    } catch (e) {
      return '';
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
  const theme = new Theme(context);
  const components = [
    header,
    await theme.component('header'),
    app,
    await theme.component('footer'),
    await theme.template('index'),
    await theme.template('404'),
    vue,
    script,
    footer
  ];
  
  const headers = new Headers();
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('x-frame-options', 'SAMEORIGIN');
  headers.set('link', '<https://unpkg.com>; rel="preconnect"');

  return new Response(components.join(''), { headers });

}