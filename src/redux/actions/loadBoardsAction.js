import loadUserAction from "./loadUserAction"

const loadBoardsAction =(data) =>{
    return {
        type: "LOAD_BOARDS",
        data
    }
}

export default loadBoardsAction;