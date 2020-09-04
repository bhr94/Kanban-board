
const initialState ={
    boards:[]
}

const rootReducer = (state =initialState, action) =>{
    console.log("action" + action)
    if(action.type === "CREATE_BOARD") {
        const board = {
            boardId: state.boards.length,
            boardTitle: action.boardTitle,
            lists:[]
                
        }
        
        let newBoards = state.boards
        newBoards.push(board)
        return {
            ...state,
            boards: newBoards
        }
    }

    if(action.type === "CREATE_LIST") {
        state.boards.filter(board =>{
            if(action.payload.boardId === board.boardId){
                let list = {
                    listId: state.boards[board.boardId].lists.length,
                    listTitle: action.payload.listTitle,
                    cards:[]
                }
               let newBoards = state.boards;
               state.boards[board.boardId].lists.push(list)
               return {
                   ...state,
                   boards:newBoards
               }
            }
        })
    }
        
    if(action.type === "CREATE_CARD") {
         state.boards.filter(board =>{
            if(action.payload.boardId === board.boardId){
               board.lists.map(list =>{
                    if(list.listId === action.payload.listId) {
                        let card = {
                            cardId: list.length,
                            cardContent:action.payload.cardContent
                        }
                        let newBoards = state.boards;
                        newBoards[board.boardId].lists[list.listId].cards.push(card);
                        return {
                            ...state,
                            boards: newBoards
                        }
                    }
                })
            }
       } )
     }
        
    return state;
    
}

export default rootReducer;


//  boards[{
//      boardId:id,
//      boardTitle: "title",
//      lists: [
//          {
//             listid:id,
//             listTitle:"title",
//                  cards:[
//                  {
//                     cardId:id,
//                     cardContext:"context"
//                 }
//         ]
//     }
//      ]
// }]