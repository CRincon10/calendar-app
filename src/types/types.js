

export const types = {

    uiOpenModal: '[ui] Open modal', 
    uiCloseModal: '[ui] Close modal', 

    eventSetActive: '[calendar] Set active',
    eventAddNew: '[calendar] Add new',
    eventClearAtive: '[calendar] Clear event active',
    eventUpDated: '[calendar] Event updated',
    eventDeleted: '[calendar] Event deleted',


/**/authCheckingFinish: '[auth] Finish checking login state',               //Verificacion de la autenticacion y validez del token
    authStartLogin: '[auth] Start login',                                   //Ejecuta el proceso asincrono para revisar posteo y autenticacion
/**/authLogin: '[auth] Login',                                              //Cuando ya tengo la autenticacion y quiero llamar algo para establecer la informacion del usuario
/**/authStartRegister: '[auth] Start register',                             //Registra un nuevo usuario               
    authStartTokenRenew: '[auth] Start token renew',                        //Renueva el token de usuario loggueado                        
/**/authLogout: '[auth] Logout',                                            //Realizar logout  

}