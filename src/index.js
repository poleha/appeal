import React from 'react' //Импортируем файл React.js из react
import { render } from 'react-dom' //Этот модуль делает
// module.exports = require('react/lib/ReactDOM');
//Мы из этого файла импортируем функцию


import { Provider } from 'react-redux'
import './styles/app.css'
//В реальном приложении, имеет смысл стили для компонентов импортировать в коде самих компонентов,
// что даст очень большие удобства для переиспользования целых блоков, включая оформление.


import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore();

render(
  <Provider store={store}>
    <div className='app'>
    <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

//Выводим обычный react app, но обернутый в Provider
//К провайдеру подключен корневой store,
//Он может в любой момент вернуть состояние console.log(store.getState());
//К store подключегн reducer, который обежиняет в себе два других reducer
//Каждый reducer - это функция, которая получает state and action
//state - это его состояние

//const initialState = {
//    year: 2016,
//    photos: []
//};

//action - Объект, который содержит type, например "SET_YEAR" и payload, - это данные. например 2015.
//action возвращает новый state


//Клик по кнопке вызывает action creator, он выдает action и сразу dispatch его. Dispatch передается reducer и он меняет state(выдает новый)