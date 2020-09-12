


const loadListsAction =(boardId, idToken) => (dispatch)=>{
    const bodyContent = JSON.stringify({
        boardId: boardId
    })
    dispatch({type: "LOAD_LISTS_PENDING"});
    fetch('http://localhost:3001/loadLists',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": idToken
            },
            body: bodyContent
        })
        .then(response => {
            return response.json()
        })
        .then(data => dispatch({type:"LOAD_LISTS_SUCCESS", payload:{data, boardId}}))
        .catch(error => dispatch({type: 'LOAD_LISTS_FAILED', payload:error }))


}

export default loadListsAction;