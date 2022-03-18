import { types } from "../types/types"



export const eventAddNewAction = ( event ) => ({
    type: types.eventAddNew,
    payload: event
})  



export const eventSetActiveAction = ( event ) => ({
    type: types.eventSetActive,
    payload: event
})


export const eventClearActiveAction = () => ({ type: types.eventClearAtive })

export const eventUpdatedAction = ( event ) => ({
    type: types.eventUpDated,
    payload: event
})

export const eventDeletedAction = ( ) => ({ type: types.eventDeleted })


