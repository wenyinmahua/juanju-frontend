let currentUser;

const setCurrentUserState = (user) =>{
    currentUser = user;
}


const getCurrentUserState = () =>{
    return currentUser;
}

export {
    getCurrentUserState,
    setCurrentUserState,
}