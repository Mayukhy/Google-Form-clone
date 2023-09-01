import *as api from '../../api/index'

//action Creators
export const getResponse=()=>async(dispatch)=>{
    try {
        const {data} = await api.fetchRes()
        dispatch({type:'FETCH_ALL',payload:data})
    } catch (error) {
        
    }
}
export const getsingleResponse=(id)=>async(dispatch)=>{
    try {
        const {data} = await api.getSingleRes(id)
        dispatch({type:'FETCH_ONE',payload:data})
    } catch (error) {
        
    }
}

export const creatResponse=(res)=>async(dispatch)=>{
    try {
        const {data} = await api.creatRes(res)
        dispatch({type:'CREATE',payload:data})
    } catch (error) {
        
    }
}

export const deleteRes=(id)=>async(dispatch)=>{
    try {
        await api.deleteRes(id)
        dispatch({type:'DELETE',payload:id})
    } catch (error) {
        
    }
}