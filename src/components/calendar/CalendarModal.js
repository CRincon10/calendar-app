import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker'; 
import moment from 'moment';
import Swal from 'sweetalert2'

import { closeModalAction } from '../../actions/uiActions'
import { eventAddNewAction, eventClearActiveAction, eventUpdatedAction } from '../../actions/calendarActions';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');




const now = moment().minutes(0).seconds(0).add(1,'hours')       //const que guarda la fecha actual
const nowPlus1 = now.clone().add(1,'hours')                     //clon de la fecha actual +1 hora

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
}







export const CalendarModal = () => {

    const dispatch = useDispatch();
    const [ dateStart, setDateStart ] = useState( now.toDate() )      //estado de la fecha actual
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() )     //estado de la fecha actual +1 hora que sera el minimo de finalizacion del evento
    const [ titleValid, setTitleValid ] = useState(true)              //estado para validar si el titulo tiene mas de dos letras y crear error de bootstrap
    const { modalOpen } = useSelector( state => state.ui );           //seleccion de reducer ui para saber si el estado del modalOpen
    const { activeEvent } = useSelector( state => state.calendar );


    const [formValues, setFormValues] = useState({ initEvent })                //estado inicial del formValues o del evento
    const { title, notes, start, end } = formValues


    useEffect(() => {                                   //activa el evento cuando cuando el activeEvent cambia y lo manda al setFormValues
      
        if( activeEvent ){                              //si activeEvent esta en null restablesco el setForm a su valor inicial sino va a tener el activeEvent
            setFormValues( activeEvent )  
        } else {
            setFormValues( initEvent );
        }
        
      
    }, [activeEvent,setFormValues])
    







    const handleInputChange = ({target}) => {
        setFormValues ({
            ...formValues,
            [target.name]: target.value 
        })
    }


    const handleStartDateChange = ( e ) => {            //el evento que recibe es la fecha
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd( e )
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitform = (e) => {
        e.preventDefault()

        //validaciones de formulario
        const momentStart = moment(start)                                   //==> start devuelve una instancia de js es necesario mandarla en el moment para convertirla                               
        const momentEnd   = moment(end)                                     //==> start devuelve una instancia de js es necesario mandarla en el moment para convertirla                            

        if( momentStart.isSameOrAfter( momentEnd )){                        //isBefore o isAfter dependiendo de lo que necesite para mi aplicacion
            
            return Swal.fire('Error','Fecha fin debe ser mayor a fecha de inicio','error')
        }   
        
        if( title.trim().length <2 ){
            return setTitleValid(false)
        }


       if( activeEvent ){                              //si el evento esta activo quiere decir que voy a actualizar si el evento esta en null quiere decri que voy a crear un nuevo evento 
           
            dispatch( eventUpdatedAction( formValues ) )
       
        }else{
            dispatch( eventAddNewAction({
                ...formValues,
                id: new Date().getTime(),
                user:{
                    _id:'1234',
                    name:'Agustin'
                }
            }) )
        }


        
        setTitleValid(true)  
        closeModal()
    }


    


    const closeModal = () => {

        dispatch(closeModalAction())
        dispatch(eventClearActiveAction())
        setFormValues( initEvent ) 
    }

    return (
        
        <Modal
        isOpen={  modalOpen  }
        // onAfterOpen={ afterOpenModal }
        onRequestClose={ closeModal }
        style={ customStyles }
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={ 300 }
        
        >

        <h1> { (activeEvent)? 'Editar evento' : 'Nuevo evento'  } </h1>
        <hr />
        <form 
            className="container"
            onSubmit= { handleSubmitform }    
        >

            <div className="form-group">
                
                <label>Fecha y hora inicio</label>
                
                <DateTimePicker 
                    onChange={ handleStartDateChange } 
                    value={ dateStart }
                    // minDate={ dateStart } 
                    className='form-control'

                />

            </div>
            
            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                    onChange={ handleEndDateChange } 
                    value={ dateEnd } 
                    className='form-control'
                    minDate={ dateStart }

                />
            </div>

            <hr />
            <div className="form-group">
                
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ `form-control ${ !titleValid && 'is-invalid' }` }
                    placeholder="Título del evento"
                    name="title"    
                    autoComplete="off"
                    value={ title }
                    onChange= { handleInputChange }

                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange= { handleInputChange }


                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block    form-control mt-2"

            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

        </Modal>
    )
}





















/*Modal es un componente que va a renderizar un modal que contiene los cambios que se van a hacer al evento se renderiza en el CalendarScreen

const customStyles  ==>  proporcionados por la página de documentacion del modal https://www.npmjs.com/package/react-modal le da estilos la modal

Modal.setAppElement('#root');    root es el elemento del index donde se esta renderizando toda mi aplicacion




 <Modal
        isOpen={ modalIsOpen }                          ==> se encarga de mostrar u ocultar el modal, recibe un booleano es decir true se muestra false se oculta
        onAfterOpen={ afterOpenModal }                  ==> ejecuta algo despues de que se abre
        onRequestClose={ closeModal }                   ==> ejecuta algo cuando se cierra
        style={ customStyles }                          ==> ejecuta el llamado a los estilos definido en la const customStyles
        className='modal'                               ==> clase asignada en el styles.css
        overlayClassName='modal-fondo'                  ==> clase superpuesta                          
        closeTimeoutMS={ 300 }                          ==> transicion en milisegundos para cerrarse
        >
        </Modal>


DateTimePicker   ==>libreria importada para mostrar formato de seleccion de hora y fecha

*/
