const createListAction =(listTitle, boardId, listId) =>{
    return {
        type: "CREATE_LIST",
        payload:{
            listTitle,
            boardId,
            listId
        }
    }
}

export default createListAction;