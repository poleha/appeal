export default {
    app: {
        title: 'Appeal site',
        description: 'Place your appeals here',
        head: {
            titleTemplate: 'Appeal site: %s',
            meta: [
                {name: 'description', content: 'Place your appeals here.'},
                {charset: 'utf-8'},
                {property: 'og:site_name', content: 'Appeal site'},
                {property: 'og:image', content: '/images/button_like.png'},
                {property: 'og:locale', content: 'ru_RU'},
                {property: 'og:title', content: 'Appeal site'},
                {property: 'og:description', content: 'Place your appeals here.'},
                {property: 'og:card', content: 'summary'},
                {property: 'og:site', content: '@poleha'},
                {property: 'og:creator', content: '@poleha'},
                {property: 'og:image:width', content: '200'},
                {property: 'og:image:height', content: '200'}
            ]
        }
    },
    api: {
      host: 'http://127.0.0.1',
      port: 8000  
    }
}