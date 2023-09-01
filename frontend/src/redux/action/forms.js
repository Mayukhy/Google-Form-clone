import *as api from '../../api/index'

//action Creators
export const getForms=()=>async(dispatch)=>{
    try {
        const {data} = await api.fetchForm()
        dispatch({type:'FETCH_ALL',payload:data})
    } catch (error) {
        
    }
}
export const getsingleForm=(id)=>async(dispatch)=>{
    try {
        const {data} = await api.getSingleform(id)
        dispatch({type:'FETCH_ONE',payload:data})
    } catch (error) {
        
    }
}

export const creatForm=(post)=>async(dispatch)=>{
    try {
        const {data} = await api.creatForm(post)
        dispatch({type:'CREATE',payload:data})
    } catch (error) {
        
    }
}

export const updateForm=(id,updatedForm)=>async(dispatch)=>{
    try {
        const {data} = await api.updateForm(id,updatedForm)
        dispatch({type:'UPDATE',payload:data})
    } catch (error) {
        
    }
}

export const deleteForm=(id)=>async(dispatch)=>{
    try {
        await api.deleteForm(id)
        dispatch({type:'DELETE',payload:id})
    } catch (error) {
        
    }
}

export const search =(searchterm)=>async(dispatch)=>{
    try {
      const {data} = await api.searchTerm(searchterm)  
      dispatch({type:'SEARCH',payload:data})
    } catch (error) {
        
    }
}