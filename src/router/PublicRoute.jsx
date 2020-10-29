import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PublicRoute = ({
   isAuthenticated,
   component: Component,
   ...rest 
}) => {
   return (
      <Route {...rest}
         component={ (props) =>(
            //evalue si esta autenticado redirecciona a /  y si no regresa al componente donde estaba
            ( isAuthenticated)
            ? (<Redirect to="/" />)
            : (<Component {...props} />)
         )}
      />
   )
}

PublicRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   component:PropTypes.func.isRequired,
}