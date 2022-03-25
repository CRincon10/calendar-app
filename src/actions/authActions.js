import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogoutAction } from "./calendarActions";


export const authStartLoginAction = ( email, password ) => {

    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth',{ email, password }, 'POST' );
        const body = await resp.json()

        if ( body.ok ){                                         
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            Swal.fire('Error', body.msg, 'error')
        }

    }
}


export const authStartRegisterAction = ( name, email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { name, email, password }, 'POST' );
        const body = await resp.json()

        if( body.ok ){
            localStorage.setItem( 'token', body.token )
            localStorage.setItem( 'token-init-date', new Date().getTime() )
            
            dispatch( register({
                name: body.name,
                email: body.email,
                password: body.password
            }) )

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
   
        }else{
            Swal.fire('Error', body.msg, 'error')
        }
    }
}


export const authStartCheckingAction = () => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'auth/renew' )
        const body = await resp.json()

        if ( body.ok ){
            localStorage.setItem( 'token', body.token )
            localStorage.setItem( 'token-init-date', new Date().getTime() ) 
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        
        }else{
            dispatch(checkingFinish())
        }
    }
}


export const authStartLogoutAction = () => {
    return ( dispatch ) => {
        localStorage.clear()
        dispatch(logout())
        dispatch( eventLogoutAction() )

    }
}


//accion sincrona que confirma si el usuario esta loggueado
const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

const register = ( user ) => ({
    type: types.authStartRegister,
    payload: user
})

const checkingFinish = () => ({ type: types.authCheckingFinish })

const logout = () => ({
    type: types.authLogout
})
































/*
En mi app tengo dos tipos de peticiones las que necesitan autenticacion y token y las que no. 
El Helper fetchSinToken  es el que me ayuda a diferenciar cada una de las peticiones también lo podria hacer con AXIOS que configura los headers casi de forma automatica(buscar informacion de ello)

if ( body.ok )     ==>   si el body esta ok guardo en lS el token y el inicio en fecha en que se genera el token para tener registro y poder estar pendiente 
    de la caducidad que son dos horas definidas en el back



fetchSinToken   ==> recibe argumento el endpoint, la data que es un objeto con el email y password y el method




*/