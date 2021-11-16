
import { authReducer } from './../../reducers/authReducer';
import { types } from './../../types/types';
const initialState = {
  checking: true,
  // uid: null,
  // name: null
}


describe('Pruebas en authReducer', () => {
  
  test('debe de retornar el estado por defecto', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('debe de autenticar el usuario', () => {
    // login en actions
    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'mario'
      }
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false, uid: '123', name: 'mario' });

  });
});