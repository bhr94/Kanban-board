const createCardAction =(cardContent, listId, boardId) =>{
   return {
       type:"CREATE_CARD",
       payload:{
           cardContent,
           listId,
           boardId
       }
   }
}

export default createCardAction;