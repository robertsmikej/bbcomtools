const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
 head: {
    htmlAttrs: {
        lang: 'en'
    },
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
        { hid: 'description', name: 'description', content: 'Tools for Employees of Bodybuilding.com' }
    ],
    link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500&display=swap"},
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: "stylesheet", href: "https://artifacts.bbcomcdn.com/@bbcom/bb-wrapper/41.2.5/styles/bb-wrapper-critical.min.css"},
        { rel: "stylesheet", href: "https://artifacts.bbcomcdn.com/marketing-app/7.0.1/marketing-ui-core.min.css"},
        { rel: "stylesheet", href: "https://artifacts.bbcomcdn.com/marketing-app/7.0.1/marketing-ui-lazy.min.css"},
        { rel: "stylesheet", href: "https://artifacts.bbcomcdn.com/product-detail-app/7.0.0/legacy.min.css"},
        { rel: "stylesheet", href: "https://store.bbcomcdn.com/stylesheets/min/product-pages.css?ver=20200428.1506-prod"},
        { rel: "stylesheet", href: "https://store.bbcomcdn.com/store/deploy/productMedia/productGuideCSS_blankCss1/blankCss1_guide_stylesheet.css"},
        { rel: "stylesheet", href: "https://artifacts.bbcomcdn.com/product-detail-app/16.1.2/product-detail-app.min.css"},
        { rel: "stylesheet", href: "https://artifacts.bbcomcdn.com/@bbcom/bb-wrapper/41.2.5/styles/bb-wrapper-non-critical.min.css"}
    ]
},

  /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

  /*
  ** Global CSS
  */
    css: [
      { src: '~/assets/styles/components.css', lang: 'css' }
    ],

  /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        "~/plugins/global.js",
        "~/plugins/vuedraggable.js"
    ],

  /*
  ** Nuxt.js modules
  */
modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
],
markdownit: {
    injected: true,
},
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
  //  extractCSS: true,
    extend(config, ctx) {
      
    }
  }
};