import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { Navbar } from '../iu/Navbar'
import { messages } from '../../helpers/calendar-messages-es'           
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { openModalAction } from '../../actions/uiActions'
import { eventClearActiveAction, eventSetActiveAction, eventStartLoadingAction } from '../../actions/calendarActions'
import { AddNewFab } from '../iu/AddNewFab'
import { DeleteEventFab } from '../iu/DeleteEventFab'



moment.locale('es')
const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {

    

    const dispatch = useDispatch();

    useEffect(() => {
  
        dispatch( eventStartLoadingAction() )
 
    }, [dispatch])



    const {events, activeEvent} = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );
    

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month' )  //estado que mantiene la ultima pestaña vista

    const onSelectEvent = ( e ) => {
        // console.log(e)
        dispatch(eventSetActiveAction( e ))
        
    }

    const onDoubleClickEvent = ( e ) => {
        // console.log(e, 'DobleClick')
        dispatch(openModalAction())
    }


    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = ( e ) => {      //limbiar el activo cuando salgo del boton eliminar   aca podria implementar que cuando esta casilla del calendario este ativa crear un nuevo evento
        dispatch( eventClearActiveAction() )
        // console.log(e)
    }

    const eventStyleGetter = ( event, start, end, isSelected ) =>{
        
        const style={
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#00BCD4',
            borderRadius: '3px',
            opacity: 0.8,
            dispalay: 'block',
            color: 'white'

        }

        return {
            style
        }
    }

    
    return (            
        <div className='calendar-screen animate__animated animate__fadeIn'>
            <Navbar/>
            
            
            <Calendar
            localizer={ localizer }
            events={ events }
            startAccessor="start"
            endAccessor="end"
            messages={ messages }
            eventPropGetter={ eventStyleGetter }
            components = {{
                event: CalendarEvent
            }}
            onDoubleClickEvent = { onDoubleClickEvent }
            onSelectEvent = { onSelectEvent }
            onView={ onViewChange }
            view={ lastView }
            onSelectSlot = { onSelectSlot }
            selectable = {true}
            />
            
            <AddNewFab />    

            {
                ( activeEvent ) &&
                <DeleteEventFab />

            }
            
            <CalendarModal />



        </div>
    )
}





























/*
import { messages } from '../../helpers/calendar-messages-es'           //helper de ayuda para cambiar mensajes del calendario a español

import 'moment/locale/es'    importacion para cambio de idioima a españorl del moment 

eventStyleGetter   ===> recibe como argumento las propiedades del evento y retorna un estilo para ese evento




<Calendar                                                      ==>importado 'react-big-calendar'
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={ eventStyleGetter }                ==>escucha los cambios de estilos por la funcioin que se manda como referencia
             components = {{                                    ==>Propiedad en la que puedo modificar el contenido del evento
                event: CalendarEvent
            }}
            onDobleClickEvent = { onDobleClickEvent }           ==>se dispara cuando se de dobleClick
            onSelectEvent = { onSelectEvent }                   ==>Se dispara cuando se selecciones el evento
            onView={ onViewChange }                             ==>Me muestra en que pestaña del calendario estoy seleccionando el evento es decir si en semana,mes,día
            onSelectSlot = { onSelectSlot }                     ==> funcion para saber que casilla del calendario esta seleccionada
            selectable = {true}                                 ==> cuando seleccione la casilla del calendario esta seleccionable treu
/>

onSelectEvent    => cuando se da click sobre el evento dispara la action eventSetActiveAction que recibe el evento.

onDoubleClickEvent   ==> Cuando se da doble click sobre el evento abre el modal para modificarlo

onViewChange      ==> esta pendiente del cambio de vista del calendario y dispara el setLastView cada vez que la vista cambia y la guarda en el local Storage





AddNewFab     ==> agregar nuevo boton flotante accion

 useEffect(() => {
  
        dispatch( eventStartLoadingAction() )
 
    }, [dispatch])                        ==> efecto que se dispara cuando se carga la pagina y dispara la accion eventStartLoadingAction que carga los eventos del calendario



*/