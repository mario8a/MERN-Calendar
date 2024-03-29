import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreen } from './../../../components/auth/LoginScreen';
import { startLogin, startRegister } from './../../../actions/auth';

jest.mock('./../../../actions/auth', () =>( {
  startLogin: jest.fn(),
  startRegister: jest.fn()
}));

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen/>
  </Provider>
)


describe('Pruebas en <LoginScreen/>', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })
  
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el dispatch del login', () => {
    
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'mario@dev.com'
      }
    });

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456'
      }
    });

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault(){}
    });

    expect(startLogin).toHaveBeenCalledWith('mario@dev.com', '123456');
  });

  test('No hay registro si las contraseñas son diferentes', () => {

    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456'
      }
    });
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123457'
      }
    });
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    });

    expect(startRegister).not.toHaveBeenCalled();
  });

});
