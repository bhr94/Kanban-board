const createListAction =(listTitle, boardId) =>{
    return {
        type: "CREATE_LIST",
        payload:{
            listTitle,
            boardId
        }
    }
}

export default createListAction;