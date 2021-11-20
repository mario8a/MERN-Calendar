import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarModal } from './../../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../../actions/events';
import { act } from 'react-dom/test-utils';
import { Swal } from 'sweetalert2';


jest.mock('./../../../actions/events', () =>( {
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn()
}));
 

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

const now = moment().minutes(0).seconds(0).add(1,'hour');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola',
      notes: 'Algunas notas',
      start: now.toDate(),
      end: nowPlus1.toDate()
    }
  },
  auth: {
    uid: '123',
    name: 'Mario'
  },
  ui: {
    modalOpen: true
  }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal/>
  </Provider>
)

describe('Pruebas en <CalendarModal/>', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })
  
  test('Debe de mostrar el modal', () => {

    // expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('debe de llamar la accion de actualizar y cerrar el modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent)
    expect(eventClearActiveEvent).toHaveBeenCalled()

  });

  test('debe demostrar error si falta el titulo', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });
  

  test('debe de crear un nuevo evento', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null
      },
      auth: {
        uid: '123',
        name: 'Mario'
      },
      ui: {
        modalOpen: true
      }
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();
    
    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal/>
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hola pruebas',
      notes: ''
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
    
  });

  // test('Debe de validar las fechas', () => {
  //   wrapper.find('input[name="title"]').simulate('change', {
  //     target: {
  //       name: 'title',
  //       value: 'Hola pruebas'
  //     }
  //   });

  //   const hoy = new Date();

  //   act(() => {
  //     wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
  //   });

  //   wrapper.find('form').simulate('submit', {
  //     preventDefault(){}
  //   });

  //   // expect(Swal).toHaveBeenCalledWith('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');


  // });
  
  
});
