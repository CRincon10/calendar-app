
import moment from "moment";
import { types } from "../types/types";


const initialState = {
    events:[{
        id: new Date().getTime(),
        title:'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgColor: '#fafafa',
        user:{
            _id:'1234',
            name:'Agustin'
        }

    }],
    activeEvent: null

}

export const calendarReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return{
                ...state,
                events:[
                    ...state.events,
                    action.payload
                ]   
            }
        case types.eventClearAtive:
            return{
                ...state,
                activeEvent: null
            }
        
        case types.eventUpDated:
            return{
                ...state,
                events: state.events.map( e => ( e.id === action.payload.id ) ? action.payload : e)  //a la que tiene el mismo id que viene en el id del payload le ponga la nueva informacion que esta en el payload sino regrese el evento como estaba
            }
            
        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(  e => ( e.id !== state.activeEvent.id)),    //recibe el evento y va a devolver sola las que del e.id sean diferentes al id de la notaActiva que esta en el state
                activeEvent: null,
            }


        default: 
            return state;
            
    }


}





































/*
initialState    ==> quiero tener los eventos y tambien el evento que esta activo para seleccionarlo en el modal y poder modificarlo.

eventSetActive          ==> retorna el state en la forma que se encuentra y retorna la action.payload del activeEvent

eventAddNew             ==> retorna el state en la forma que se encuentra y a a la propiedad eventos le indico que retorne los eventos como estan actualmente y le agregue
el action.payload

*/