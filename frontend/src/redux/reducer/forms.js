export default (forms = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload //actual post
            case 'FETCH_ONE':
                return action.payload //actual post
            case 'CREATE':
                return [...forms,action.payload] //actual post
                case 'UPDATE':
                    return forms?.map((form)=>{form?._id === action.payload._id ? action.payload : form}) //editing the form
                    case 'DELETE':
                        return forms?.filter((form)=>{form?._id !== action.payload })//actual post
                        case 'SEARCH':
                            return action.payload //actual post
                        default:
                            return forms
                
    }
}