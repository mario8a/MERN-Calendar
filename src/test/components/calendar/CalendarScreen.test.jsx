import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from './../../../components/calendar/CalendarScreen';
import { messages } from './../../../helpers/calendar-messages.es';
import { types } from './../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/events';
import { act } from 'react-dom/test-utils';

jest.mock('./../../../actions/events', () =>( {
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}))
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

const initState = {
  calendar: {
    events: []
  },
  auth: {
    uid: '123',
    name: 'Mario'
  },
  ui: {
    openModal: false
  }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen/>
  </Provider>
)

describe('Pruebas en <CalendarScreen/>', () => {
  
  test('Debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Pruebas con las interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal});

    calendar.prop('onSelectEvent')({start: 'Hola'});
    expect(eventSetActive).toHaveBeenCalledWith({start: 'Hola'});

    //Act porque esa instruccion hace una modificacion en el setState
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView','week');
    })
  });
  

});