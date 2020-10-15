import React from 'react';
import { Provider } from 'react-redux';
//store
import { store } from './store/store';
//rutas
import { AppRouter } from './router/AppRouter';


export const CalendarApp = () => {
   return (
      <Provider store={store}>
        <AppRouter/>        
      </Provider>
   )
}
