const updateListTitle =(listId, data) =>{
    return {
        type:'UPDATE_LIST_TITLE',
        payload:{
            listId,
            data
        }
    }
}

export default updateListTitle;