
const baseUrl = process.env.REACT_APP_API_URL

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${baseUrl}/${endpoint}`

    if( method === 'GET' ){
        return fetch( url )
    }else{
        return fetch( url, {
            method,
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify( data )
        } )
    }

}

const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${endpoint}`
    const token = localStorage.getItem('token') || '';           //cuando el usuario se autentica o registra genera el token que ya guarde en el lS

    if ( method === 'GET' ){
        return fetch( url, {
            method,
            headers:{
                'x-token': token
            }
        } )
    }else {
        return fetch( url, {
            method,
            headers:{
                'Content-type':'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        } )
    }

}




export {
    fetchSinToken,
    fetchConToken
}











/*
Este helper separa las peticiones que requieren token de las que no.

recibe como argumento el:
    endpoint al que yo quiero llamar ya sea /auth  /events,  
    data la informacion que quiero ya sea porstear o recuperar o actualizar
    method que es si el usuario quiere hacer un GET o un POST o un DELETE y por defecto lo dejo en GET


backend trabajando con formato de content type aplication Json es decir solo recibe Json.
*/