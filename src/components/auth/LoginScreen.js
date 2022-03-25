import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { authStartLoginAction, authStartRegisterAction } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: "mariana@gmail.com",
        lPassword: "12341234"
    })
    const { lEmail, lPassword } = formLoginValues

    const handleLogin = ( e ) => {
        e.preventDefault()
     
        dispatch( authStartLoginAction( lEmail, lPassword ) )
        
    }


    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        // rName:"Carl" ,
        // rEmail: "carlsagan@gmail.com",
        // rPassword1: "12341234",
        // rPassword2: "12341243"
    })
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues
    
    const handleRegister = ( e ) => {
        e.preventDefault()

        if( rPassword1 !== rPassword2 ){
            return Swal.fire('Error', 'Contraseñas no coinciden', 'error' )
        }

        dispatch( authStartRegisterAction( rName, rEmail, rPassword1 ) )

    }
    
    

    return (
        <div className="container login-container animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>

                    <form 
                    onSubmit={ handleLogin }
                    className='animate__animated animate__fadeIn animate__fadeIn'
                    >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>

                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rName'
                                value={rName}
                                onChange={ handleRegisterInputChange }

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={ handleRegisterInputChange }

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='rPassword1'
                                value={rPassword1}
                                onChange={ handleRegisterInputChange }

                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='rPassword2'
                                value={rPassword2}
                                onChange={ handleRegisterInputChange }

                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}