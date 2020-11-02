import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";

///LOGIN
export const startLogin = (email, password) => {
   return async (dispatch) => {
      
      const resp = await fetchSinToken('auth', {email, password}, 'POST');
      const body = await resp.json();

      if(body.ok) {
         //guardando el token en localstorage
         localStorage.setItem('token', body.token);
         //Guado la cantidad e tiempo de que el token expire
         localStorage.setItem('token-init-date', new Date().getTime());
         
         dispatch(login({
            uid: body.uid,
            name: body.name
         }));
      } else {
         Swal.fire('Error', body.msg, 'error');
      }
      
   }
}

//Registro

export const startRegister =  (email, password, name) => {
   return async (dispatch) => {

      const resp = await fetchSinToken('auth/new', {email, password, name}, 'POST');
      const body = await resp.json();

      if(body.ok) {
         //guardando el token en localstorage
         localStorage.setItem('token', body.token);
         //Guado la cantidad e tiempo de que el token expire
         localStorage.setItem('token-init-date', new Date().getTime());
         
         dispatch(login({
            uid: body.uid,
            name: body.name
         }));
      } else {
         Swal.fire('Error', body.msg, 'error');
      }

   }
}

export const startChecking = () => {
   return async (dispatch) => {

      const resp = await fetchConToken('auth/renew')
      const body = await resp.json();

      if(body.ok) {
         //guardando el token en localstorage
         localStorage.setItem('token', body.token);
         //Guado la cantidad e tiempo de que el token expire
         localStorage.setItem('token-init-date', new Date().getTime());
         
         dispatch(login({
            uid: body.uid,
            name: body.name
         }));
      } else {
         dispatch(checkingFinish());
      }
   }
}

const checkingFinish = () => ({
   type: types.authCheckingFinish
})

const login = (user) => ({
   type: types.authLogin,
   payload: user
});


export const startLogout = () => {
   return (dispatch) => {

      localStorage.clear();
      dispatch(eventLogout())
      dispatch(logout())

   }
}

const logout = () => ({
   type: types.authLogout
})