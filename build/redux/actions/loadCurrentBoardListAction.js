const loadCurrentBoardListAction =(boardId, idToken) =>(dispatch) =>{

    dispatch({type: "LOAD_CURRENT_BOARD_LIST_PENDING"});
    fetch('http://localhost:3001/loadCurrentBoardList',
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          "Authorization": idToken
        },
        body:JSON.stringify({
            boardId: boardId
          })
      })
      .then(response =>{
        return response.json()
      })
      .then(async lists => {     
        console.log("hello " + lists) 
        await Promise.all(lists.map(async list => {
            let response = await fetch('http://localhost:3001/loadCards',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": idToken
                    },
                    body: JSON.stringify({
                        listId: list.listid
                    })
                });
            let newcards = await response.json()
            list.cards  = newcards
        }))

        console.log("lists " + JSON.stringify(lists))
        return lists;
    })
      .then(data => dispatch({type:"LOAD_CURRENT_BOARD_LIST_SUCCESS", payload:data}))
      .catch(error => dispatch({type: 'LOAD_CURRENT_BOARD_LIST_FAILED', payload:error }))
}

export default loadCurrentBoardListAction;