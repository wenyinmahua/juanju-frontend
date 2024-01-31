import request from "/src/plugins/myAxios.js";

export const userLoginService = (UserLoginRequest) =>{
    return request.post('user/login',UserLoginRequest);
}
export const userRegisterService = (UserRegisterRequest) =>{
    return request.post('user/register',UserRegisterRequest);
}