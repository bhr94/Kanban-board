const updateCardContentAction =(cardId, data) =>{
    return {
        type:'UPDATE_CARD_CONTENT', 
        payload:{
            cardId, 
            data
        }
    }
}


export default updateCardContentAction;