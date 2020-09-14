
const loadBoardsAction = ( userId, idToken) =>(dispatch) =>{
    const bodyContent = JSON.stringify({
        userId: userId
      });
    dispatch({type: "LOAD_BOARDS_PENDING"});
    fetch('http://localhost:3001/loadBoards',
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          "Authorization": idToken
        },
        body:bodyContent
      })
      .then(response =>{
        return response.json()
      })
      .then(data => dispatch({type:"LOAD_BOARDS_SUCCESS", payload:data}))
      .catch(error => dispatch({type: 'LOAD_BOARDS_FAILED', payload:error }))
       
}


export default loadBoardsAction;