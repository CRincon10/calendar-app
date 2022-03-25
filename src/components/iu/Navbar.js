import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authStartLogoutAction } from '../../actions/authActions';



export const Navbar = () => {

    const {name} = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogout = (  ) => {
        dispatch(authStartLogoutAction())
        
    }


    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                {name}
            </span>
            
            <button 
                className='btn btn-outline-danger'
                onClick={ startLogout } 
                   
            >
                <i className='fas fa-sign-out-alt'></i>
                <span> Salir</span>
            </button>
            
        </div>
    )
}
