import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { authStartCheckingAction } from '../actions/authActions';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector( state => state.auth );

    useEffect(() => {
      
        dispatch(authStartCheckingAction())
        
    }, [dispatch])

    if ( checking ){
        return ( <h5>Espere.....</h5> )
    }
    

    return (
        <BrowserRouter>
            <div>

                <Switch>
                    <PublicRoutes
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isAuthenticated = { !!uid }
                        
                    />
                    
                    <PrivateRoutes 
                        exact
                        path="/"
                        component={ CalendarScreen }
                        isAuthenticated = { !!uid }
                        
                    />
                    
                    <Redirect to="/" />
                </Switch>

            </div>
            
        </BrowserRouter>
    )
}











/*
Proteccion de rutas con confirmacion de login de usuario, generacion y revalidacion de token cada dos horas segun backend

useSelector ==>me proporciona el checking y el uid del usuario en el path auth cuando hace la autenticacion

useEfecct esta pendiente de los cambios que se hagan en la dependencia dispatch que dispara la accion authStartCheckingAction esta me confirma cunado 
el usuario tiene la propiedad checking en true o en false y de forma condicional y dependiendo de esto voy a mostrar las rutas.
si el uid cambia el componente se vuelve a redibujar es por eso que cuando el usuario hace el loggout esto se vuelve a redibujar y cambia las rutas

{ !!uid }   ==> proporcionado por el useSelector puede o no tener un id dependiendo de la autenticacion del usuario, con el doble !! lo que hago
es convertir un string en un valor booleano que es lo que necestira el isAtenticated para saber que ruta mostrar.
si un string tiene un solo !uid regresa false pero si tiene !!regresa true

*/