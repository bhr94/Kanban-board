
const createBoardAction =(boardTitle) =>{
    return {
        type: "CREATE_BOARD",
        boardTitle: boardTitle
    }
}

export default createBoardAction;