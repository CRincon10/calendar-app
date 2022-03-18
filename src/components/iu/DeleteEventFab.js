import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDeletedAction } from '../../actions/calendarActions';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const handleDeleteEvent = () => {
        dispatch( eventDeletedAction())
    }

    return (
        <button
            className='btn btn-danger fab-danger'
                onClick={ handleDeleteEvent }
        >
            <i className='fas fa-trash'></i>
            <span> Borrar evento</span>
        </button>
    )
}
