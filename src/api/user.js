import request from "/src/plugins/myAxios.js";
import {getCurrentUserState, setCurrentUserState} from "../store/user.js";

export const userLoginService = (UserLoginRequest) =>{
    return request.post('user/login',UserLoginRequest);
}
export const userRegisterService = (UserRegisterRequest) =>{
    return request.post('user/register',UserRegisterRequest);
}

export const getUser =() =>{
    return request.get("/user/current");
}

export const getCurrentUserService = () => {
    // return request.get('/user/current')
    const currentUser = getCurrentUserState();
    if(currentUser){
        return currentUser;
    }
    const res = request.get('/user/current');
    if(res.code === 0 ){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}
