//1. 导入vue-router
import { createRouter, createWebHistory} from "vue-router";
//2. 导入页面组件
import Index from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import Search from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserEditGenderPage from "../pages/UserEditGenderPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";


//3. 定义路由关系，由一个数组确定

const routes = [
    {path: '/login', component: UserLoginPage},
    {path:'/index',component: BasicLayout, redirect: '/',
    children:[
        {path: '/',component : Index},
        {path: '/team',component: TeamPage},
        {path: '/user', component: UserPage},
        {path: '/search', component: Search},
        {path: '/user/edit', component: UserEdit},
        {path: '/user/list', component: SearchResultPage},
        {path: '/team/add', component: TeamAddPage },
        {path: '/team/update', component: TeamUpdatePage},
        {path: '/user/editGender', component: UserEditGenderPage},
        {path: '/user/update', component: UserUpdatePage},
        {path: '/user/team/join', component: UserTeamJoinPage},
        {path: '/user/team/create', component: UserTeamCreatePage},

    ]
    },

]

//4. 创建路由器
const router = createRouter({
    history : createWebHistory(),
    routes : routes
})
//5. 导出router函数
export default router;
