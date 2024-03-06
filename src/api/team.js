import request from "/src/plugins/myAxios.js";

export const addTeamService = (TeamRequest) =>{
    return request.post("/team/add",TeamRequest);
}

export const deleteTeamService = (id) =>{
    return request.post("/team/delete",{id:id});
}

export const uploadImage = (file) => {
    return request.post('/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data' // 设置正确的请求头
            }
        }
    );
}
export const getTeamById =(id) =>{
    return request.get('/team/get?id='+id);
}



export const updateTeamService = (TeamUpdateRequest) =>{
    return request.put('/team/update',TeamUpdateRequest);
}

