// Fab is floating action button

import React from 'react'
import { useDispatch } from 'react-redux';
import { openModalAction } from '../../actions/uiActions';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModalAction())
    }



    return (
        <button
            className='btn btn-primary fab'
            onClick={ handleOpenModal }
        > 
            <i className='fas fa-plus'></i>
        </button>
    )
}



























/*
boton flotante que me permite activar el modal, se renderiza en el <calendarScreen/>

*/