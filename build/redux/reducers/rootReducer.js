import { data } from "jquery";
import { isConditionalExpression } from "typescript";

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
    cardsLoadError: '',
    isCurrentBoardPending: false,
    currentBoardLoadError: '',
    currentBoard: {},
    isCurrentBoardListPending: true,
    currentBoardListLoadError: ''

}

const rootReducer = (state = initialState, action) => {
    if (action.type === "CREATE_BOARD") {
        const board = {
            boardId: action.payload.boardId,
            boardTitle: action.payload.boardTitle,
            lists: []

        }

        // let newBoards = state.boards
        // newBoards.push(board)
        return {
            ...state,
            currentBoard: board
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


    switch (action.type) {
        case 'LOAD_CURRENT_BOARD_PENDING':
            return Object.assign({}, state, { isCurrentBoardPending: true });
        case 'LOAD_CURRENT_BOARD_SUCCESS':
            let board = state.currentBoard;
            board = [{
                boardId: action.payload.boardid,
                boardTitle: action.payload.boardname,
                lists: []
            }]
            return Object.assign({}, state, { currentBoard: board, isCurrentBoardPending: false });
        case 'LOAD_CURRENT_BOARD_FAILED':
            return Object.assign({}, state, { currentBoardLoadError: action.payload })
    }

    switch (action.type) {
        case 'LOAD_CURRENT_BOARD_LIST_PENDING':
            return Object.assign({}, state, { isCurrentBoardListPending: true });
        case 'LOAD_CURRENT_BOARD_LIST_SUCCESS':
            let board = state.currentBoard;
            board.lists = action.payload;
            return Object.assign({}, state, { currentBoard: board, isCurrentBoardListPending: false });
        case 'LOAD_CURRENT_BOARD_LIST_FAILED':
            return Object.assign({}, state, { currentBoardListLoadError: action.payload })
    }

    if (action.type === 'EMPTY_BOARDS') {
        let emptyBoards = state.boards;
        emptyBoards.splice(0, emptyBoards.length);
        return {
            ...state,
            boards: emptyBoards
        }
    }


    if (action.type === 'ADD_CURRENT_BOARD_LIST') {
        let board = state.currentBoard;
        board.lists.push(action.payload);
        board.lists[board.lists.length - 1].cards = []
        return {
            ...state,
            currentBoard: board
        }
    }

    if (action.type === 'REMOVE_CURRENT_BOARD_DATA') {
        let board = state.currentBoard;
        board.lists = [];
        return {
            ...state,
            currentBoard: board
        }
    }

    if (action.type === 'ADD_CURRENT_BOARD_CARD') {
        let board = state.currentBoard;
        board.lists.map(list => {
            if (action.payload.listId === list.listid) {
                list.cards.push(action.payload.data)
            }
        })
        return {
            ...state,
            currentBoard: board
        }
    }

    if (action.type === 'UPDATE_LIST_TITLE') {
        let board = state.currentBoard;
        board.lists.map(list => {
            if (action.payload.listId === list.listid) {
                list.listtitle = action.payload.data.listtitle;
            }
        })
        return {
            ...state,
            currentBoard: board
        }
    }

    if (action.type === 'UPDATE_CARD_CONTENT') {
        let board = state.currentBoard;
        board.lists.map(list => {
            if (action.payload.data.listid === list.listid) {
                list.cards.map(card => {
                    if (card.cardid === action.payload.cardId) {
                        card.cardcontent = action.payload.data.cardcontent
                    }
                })
            }
            return {
                ...state,
                currentBoard: board
            }
        })
    }

    if (action.type === 'UPDATE_LIST') {
        let board = state.currentBoard;
        board.lists.map(list=> {
            if (list.listid === action.payload.listid) {
                list.cards.push(action.payload)
            }

       })
       return {
        ...state,
        currentBoard: board
    }
    }

    if(action.type === 'DELETE_CARD_FROM_LIST') {
        let board = state.currentBoard;
        board.lists.map(list=> {
            if (list.listid === action.payload.sourceListId) {
                list.cards.map((card,i)=>{
                    if(card.cardid === action.payload.data.cardid) {
                       list.cards.splice(i, 1)
                    }
                })
              }
              console.log('deleted list ' + JSON.stringify(list))
        })

        return {
            ...state,
            currentBoard: board
        }
    }

    if(action.type === 'ADD_NEW_BOARD'){
        let boards = state.boards
        boards.push(action.payload)
        return {
            ...state,
            boards:boards
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