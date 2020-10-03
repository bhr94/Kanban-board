const addCurrentBoardCardAction =(data, listId) =>{
    return {
        type:'ADD_CURRENT_BOARD_CARD',
        payload:{data, listId}
    }
}


export default addCurrentBoardCardAction;