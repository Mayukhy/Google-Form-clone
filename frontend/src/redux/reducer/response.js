export default (responses = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload //actual post
            case 'FETCH_ONE':
                return action.payload //actual post
            case 'CREATE':
                return [...responses,action.payload] //actual post
                    case 'DELETE':
                        return responses?.filter((res)=>res?._id !== action.payload) //actual post
                        default:
                            return responses
                
    }
}