import request from "/src/plugins/myAxios.js";
import { setCurrentUserState} from "../store/user.js";

export const userLoginService = (UserLoginRequest) =>{
    return request.post('user/login',UserLoginRequest);
}
export const userRegisterService = (UserRegisterRequest) =>{
    return request.post('user/register',UserRegisterRequest);
}


export const getCurrentUserService = async () => {
    // const currentUser = getCurrentUserState();
    // if(currentUser){
    //     return currentUser;
    // }
    const res = await request.get('/user/current');
    if(res.code === 0 ){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}
