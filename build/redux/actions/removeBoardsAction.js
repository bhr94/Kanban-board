

const removeBoardsAction =(userId) =>{
    return {
        type:'REMOVE_BOARDS',
        payload:userId
    }
}

export default removeBoardsAction;