import { types } from "../types/types";

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}


export const authReducer = ( state = initialState ,action ) => {

    switch (action.type) {

        case types.authLogin:
            return{
                ...state,               //el estado como estaba
                ...action.payload,      //y el payload ahora tiene un objeto con el uid y el name del usuario       
                checking: false         //en false porque ya se verifico el usuario
            }
            
        case types.authStartRegister:
            return{
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return{
                ...state,
                checking: false
            }
        
        case types.authLogout:
            return{
                checking: false
            }


        default:
            return state
    }

}


















/*
    initialState    
        checking: true,  ==>  en el primer momento cuando la aplicacion se carga necesito autenticar si el usuario esta autenticado o no, si no esta autenticado lo tengo que 
                              redirigir al login y si esta autenticado tengo que mantenerlo en la página donde esta trabajando siempre y cuando sea una página de la app.
*/