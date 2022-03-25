import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"
import {prepareEvents} from "../helpers/prepareEvents"
import Swal from "sweetalert2"


export const eventStartAddNewAction = ( event ) => {
    return async( dispatch, getState ) => {
        
        const { uid, name } = getState().auth;

        try {

            const resp = await fetchConToken('events', event, 'POST')
            const body = await resp.json() 
        
            if ( body.ok ){

                event.id = body.evento.id
                event.user = {
                    _id: uid,
                    name
                }
                dispatch( eventAddNewAction( event ) )
            }
            
            
        } catch (error) {
            console.log(error)
        }
        
    }
}

const eventAddNewAction = ( event ) => ({
    type: types.eventAddNew,
    payload: event
})  



export const eventSetActiveAction = ( event ) => ({
    type: types.eventSetActive,
    payload: event
})


export const eventClearActiveAction = () => ({ type: types.eventClearAtive })



export const eventUpdatedAction = ( event ) => {
    return async( dispatch ) => {

        try {

            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json() 
        
            if ( body.ok ){
                dispatch( eventUpdated( event ) )
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
            
            
        } catch (error) {
            console.log(error)
        }
        

    }

}

const eventUpdated = ( event ) => ({
    type: types.eventUpDated,
    payload: event
})


export const eventDeletedAction = () => {
    return async( dispatch, getState ) => {
        
        const { activeEvent } = getState().calendar;

        try {

            const resp = await fetchConToken(`events/${activeEvent.id}`, {}, 'DELETE')
            const body = await resp.json() 
        
            if ( body.ok ){
                dispatch( eventDeleted() )
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
            
            
        } catch (error) {
            console.log(error)
        }
        

    }

}

const eventDeleted = ( ) => ({ type: types.eventDeleted })



export const eventStartLoadingAction = () => { 
    return async(dispatch) => {
        
        try {
            
            const resp = await fetchConToken('events')
            const body = await resp.json() 
            
            const events = prepareEvents( body.eventos )
            
            if ( body.ok ){
                dispatch( eventsLoaded( events ) )
            }
   
        } catch (error) {
            console.log(error)
        }
            
        
        
    }

}

const eventsLoaded = ( events ) => ({
    type: types.eventsLoaded,
    payload: events
})


export const eventLogoutAction = () => ({
    type: types.eventLogout
})













/*
eventStartLoadingAction   ==>  es el que carga los eventos que esten en la base de datos y los muestra en el calendarScreen
    prepareEvents es un helper que convierte la fecha de los eventos en formato de moment para poderlos mostrar en el calendario

eventLogoutAction  ==> es llamada en el authActions.js cuando el usuario se desloguea

    */
