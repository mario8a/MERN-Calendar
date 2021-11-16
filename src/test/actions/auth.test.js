import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin, startRegister, startChecking } from './../../actions/auth';
import { types } from './../../types/types';
import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();


describe('Pruebas en las acciones en auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('startLogin correcto', async () => {

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(startLogin('mario@dev.com', '123456'));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

  });

  test('startLogin incorrecto', async () => {

    await store.dispatch(startLogin('mario@dev.com', '123454566'));
    const actions = store.getActions();

    expect(actions).toEqual([]);
  });

  test('startRegister correcto', async () => {
    
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC123'
        }
      }
    }));

    await store.dispatch(startRegister('test@test.com', '123456', 'test'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos'
      }
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

  });

  test('startChecking correcto', async () => {

    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC123'
        }
      }
    }))

    await store.dispatch(startChecking());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos'
      }
    });

  });
});