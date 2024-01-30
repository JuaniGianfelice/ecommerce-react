import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';

export const store = configureStore({
  reducer: rootReducer,
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    
//Aca va ir un poco de logica
//Redux Devtools es una extension del navegador para ver como cambia el estado de la aplicacion y de que manera; solo se agrega en el store este codigo para que funcione.
//Esto no afecta en nada a nuestro codigo