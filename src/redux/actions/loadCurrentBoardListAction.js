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
      .then(data => dispatch({type:"LOAD_CURRENT_BOARD_LIST_SUCCESS", payload:data}))
      .catch(error => dispatch({type: 'LOAD_CURRENT_BOARD_LIST_FAILED', payload:error }))
}

export default loadCurrentBoardListAction;