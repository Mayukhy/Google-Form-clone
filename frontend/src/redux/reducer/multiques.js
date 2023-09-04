export default (mcqs = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload //actual post
            case 'FETCH_ONE':
                return action.payload //actual post
            case 'CREATE':
                return [...mcqs,action.payload] //actual post
                    case 'DELETE':
                        return mcqs?.filter((q)=>q?._id !== action.payload) //actual post
                        default:
                            return mcqs
                
    }
}