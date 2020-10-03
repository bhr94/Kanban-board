const deleteCardFromPreviousListAction = (sourceListId, data) =>{
    return {
        type: 'DELETE_CARD_FROM_LIST',
        payload:{sourceListId,
        data}
    }
}

export default deleteCardFromPreviousListAction;