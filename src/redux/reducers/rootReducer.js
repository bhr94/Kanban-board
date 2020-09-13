
const initialState = {
    boards: [],
    isBoardsPending: false,
    boardsLoadError: '',
    user: {
        userId: 0,
        userName: "",
        email: "",
        idToken: ""
    },
    isListsPending: false,
    listsLoadError: '',
    isCardsPending: false,
    cardsLoadError: ''

}

const rootReducer = (state = initialState, action) => {
    if (action.type === "CREATE_BOARD") {
        const board = {
            boardId: action.payload.boardId,
            boardTitle: action.payload.boardTitle,
            lists: []

        }

        let newBoards = state.boards
        newBoards.push(board)
        return {
            ...state,
            boards: newBoards
        }
    }

    if (action.type === "CREATE_LIST") {
        let newBoards = state.boards;
        // console.log("newBoards: " + JSON.stringify(newBoards))
        newBoards.filter(board => {
            if (action.payload.boardId === board.boardId) {
                let list = {
                    listId: action.payload.listId,
                    listTitle: action.payload.listTitle,
                    cards: []
                }

                board.lists.push(list)
                return {
                    ...state,
                    boards: newBoards
                }
            }
        })
    }

    if (action.type === "CREATE_CARD") {
        let newBoards = state.boards;
        newBoards.filter(board => {
            if (action.payload.boardId === board.boardId) {
                board.lists.map(list => {
                    if (list.listId === action.payload.listId) {
                        let card = {
                            cardId: action.payload.cardId,
                            cardContent: action.payload.cardContent
                        }
                        list.cards.push(card);
                        return {
                            ...state,
                            boards: newBoards
                        }
                    }
                })
            }
        })
    }


    if (action.type === "LOAD_USER") {
        let newUser = state.user;
        newUser = {
            userId: action.payload.userId,
            userName: action.payload.userName,
            email: action.payload.email,
            idToken: action.payload.idToken
        }
        return {
            ...state,
            user: newUser
        }
    }

    switch (action.type) {
        case "LOAD_BOARDS_PENDING":
            return Object.assign({}, state, { isBoardsPending: true });
        case 'LOAD_BOARDS_SUCCESS':
            let newBoards = state.boards;
            action.payload.map(board => {
                let newBoard = {
                    boardId: board.boardid,
                    boardTitle: board.boardname,
                    lists: []
                }
                newBoards.push(newBoard)
            })
            return Object.assign({}, state, { boards: newBoards, isBoardsPending: false });

        case 'LOAD_BOARDS_FAILED':
            return Object.assign({}, state, { boardsLoadError: action.payload })

    }

    switch (action.type) {
        case 'LOAD_LISTS_PENDING':
            return Object.assign({}, state, { isListsPending: true });
        case 'LOAD_LISTS_SUCCESS':
            let newBoards = state.boards;
            newBoards.map(board => {
                if (board.boardId === action.payload.boardId) {
                    console.log("action.payload.lists " + JSON.stringify(action.payload.lists))
                    action.payload.lists.map(list => {
                        let newList = {
                            listId: list.listid,
                            listTitle: list.listtitle,
                            cards: list.cards
                        }
                        board.lists.push(newList)

                    })
                }
            })
            return Object.assign({}, state, { boards: newBoards, isListsPending: false });
        case 'LOAD_LISTS_FAILED':
            return Object.assign({}, state, { listsLoadError: action.payload })

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