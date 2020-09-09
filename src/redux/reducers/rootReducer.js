
const initialState ={
    boards:[],
    user:{
        userId:0,
        userName:"",
        email:"",
        idToken:""
    }
}

const rootReducer = (state =initialState, action) =>{
    if(action.type === "CREATE_BOARD") {
        const board = {
            boardId: action.payload.boardId,
            boardTitle: action.payload.boardTitle,
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
                    listId: action.payload.listId,
                    listTitle: action.payload.listTitle,
                    cards:[]
                }
               let newBoards = state.boards;
               newBoards[board.boardId].lists.push(list)
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
                            cardId: action.payload.cardId,
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


     if(action.type === "LOAD_USER"){
         let newUser = state.user;
         newUser ={
            userId:action.payload.userId,
            userName: action.payload.userName,
            email:action.payload.email,
            idToken: action.payload.idToken
         }
         return {
             ...state,
             user:newUser
         }
     }

     if(action.type === "LOAD_BOARDS"){
         let newBoards = state.boards;
        action.data.map(board =>{
            let newBoard = {
                boardId:board.boardid,
                boardTitle:board.boardname
            }
            newBoards.push(newBoard)
        })
         return {
             ...state,
             boards:newBoards
         }
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