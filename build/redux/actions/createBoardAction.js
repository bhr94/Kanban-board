
const createBoardAction =(boardTitle, boardId) =>{
    return {
        type: "CREATE_BOARD",
        payload :{
            boardTitle,
            boardId
        }
    }
}

export default createBoardAction;