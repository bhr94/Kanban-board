


const loadListsAction = (boardId, idToken) => (dispatch) => {
    const bodyContent = JSON.stringify({
        boardId: boardId
    })
    dispatch({ type: "LOAD_LISTS_PENDING" });
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
        .then(lists => dispatch({ type: "LOAD_LISTS_SUCCESS", payload: { lists, boardId } }))
        .catch(error => dispatch({ type: 'LOAD_LISTS_FAILED', payload: error }))


}

export default loadListsAction;