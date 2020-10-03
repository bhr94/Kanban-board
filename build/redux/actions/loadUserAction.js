const loadUserAction =(userId, userName, email, idToken) =>{
    return {
        type:"LOAD_USER",
        payload:{
            userId,
            userName,
            email,
            idToken
        }
    }
}

export default loadUserAction;