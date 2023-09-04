import *as api from '../../api/index'

//action Creators
export const getQ=()=>async(dispatch)=>{
    try {
        const {data} = await api.fetchq()
        dispatch({type:'FETCH_ALL',payload:data})
    } catch (error) {
        
    }
}


export const creatQ=(res)=>async(dispatch)=>{
    try {
        const {data} = await api.creatq(res)
        dispatch({type:'CREATE',payload:data})
    } catch (error) {
        
    }
}

export const deleteQ=(id)=>async(dispatch)=>{
    try {
        await api.deleteq(id)
        dispatch({type:'DELETE',payload:id})
    } catch (error) {
        
    }
}