const createCardAction =(cardContent, listId, boardId, cardId) =>{
   return {
       type:"CREATE_CARD",
       payload:{
           cardContent,
           listId,
           boardId,
           cardId
       }
   }
}

export default createCardAction;