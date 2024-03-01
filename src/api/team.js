import request from "/src/plugins/myAxios.js";

export const addTeamService = (TeamRequest) =>{
    return request.post("/team/add",TeamRequest);
}