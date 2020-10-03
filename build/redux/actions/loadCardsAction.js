

 const loadCardsAction = (listId, boardId, idToken) => (dispatch) => {
    const bodyContent = JSON.stringify({
        listId: listId
    })
    dispatch({ type: "LOAD_CARDS_PENDING" });
    fetch('http://localhost:3001/loadCards',
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
        .then(data => dispatch({ type: "LOAD_CARDS_SUCCESS", payload: { data, boardId, listId } }))
        .catch(error => dispatch({ type: 'LOAD_CARDS_FAILED', payload: error }))

}
    
export default loadCardsAction;