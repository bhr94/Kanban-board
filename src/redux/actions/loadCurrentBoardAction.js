const loadCurrentBoardAction =(boardId, idToken) =>(dispatch) =>{

    dispatch({type: "LOAD_CURRENT_BOARD_PENDING"});
    fetch('http://localhost:3001/loadCurrenteBoard',
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
      .then(data => dispatch({type:"LOAD_CURRENT_BOARD_SUCCESS", payload:data}))
      .catch(error => dispatch({type: 'LOAD_CURRENT_BOARD_FAILED', payload:error }))
}

export default loadCurrentBoardAction;