import React from 'react'

export const CalendarEvent = ({event}) => {

    const {title, user} = event

    return (
        <div>
            <span>{title}</span>
            <small>-{user.name}</small>
        </div>
    )
}




















/*Componente que maneja lo que va dentro del evento

*/