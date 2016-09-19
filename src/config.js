export default {
    app: {
        title: 'Сделаем жизнь лучше',
        description: 'На этом сайте люди публикуют их предложения о том, как улучшить жизнь',
        head: {
            titleTemplate: 'Qblik.ru: %s',
            meta: [
                {name: 'description', content: 'На этом сайте люди публикуют их предложения о том, как улучшить жизнь'},
                {charset: 'utf-8'},
                {property: 'og:site_name', content: 'Qblik.ru | Сделаем жизнь лучше'},
                {property: 'og:image', content: '/images/button_like.png'},
                {property: 'og:locale', content: 'ru_RU'},
                {property: 'og:title', content: 'Qblik.ru | Сделаем жизнь лучше'},
                {property: 'og:description', content: 'На этом сайте люди публикуют их предложения о том, как улучшить жизнь'},
                {property: 'og:card', content: 'На этом сайте люди публикуют их предложения о том, как улучшить жизнь'},
                {property: 'og:site', content: '@poleha'},
                {property: 'og:creator', content: '@poleha'},
                {property: 'og:image:width', content: '200'},
                {property: 'og:image:height', content: '200'}
            ]
        }
    },
    api: {
      host: __DEVELOPMENT__ ? 'localhost' : '5.45.112.163',
      port: 8000  
    },
    cookie : {
        expireDays: 7
    },
    domen: __DEVELOPMENT__ ? 'localhost:3000' : 'qblik.ru',
    smiley: [
        {filename: '1.png', data: '(inlove)', alt: ''},
        {filename: '2.png', data: ':^)', alt: ''},
        {filename: '3.png', data: ':D', alt: ''},
        {filename: '4.png', data: ':D', alt: ''},
        {filename: '5.png', data: ':D', alt: ''},
        {filename: '6.png', data: ':D', alt: ''},
        {filename: '7.png', data: ':D', alt: ''},
        {filename: '8.png', data: ':D', alt: ''},
        {filename: '9.png', data: ':D', alt: ''},
        {filename: '10.png', data: ':D', alt: ''},
        {filename: '11.png', data: ':D', alt: ''},
        {filename: '12.png', data: ':D', alt: ''}
    ]
}