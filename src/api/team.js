import request from "/src/plugins/myAxios.js";

export const addTeamService = (TeamRequest) =>{
    return request.post("/team/add",TeamRequest);
}

export const uploadImage = (file) => {
    return request.post('/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data' // 设置正确的请求头
            }
        }
    );
}