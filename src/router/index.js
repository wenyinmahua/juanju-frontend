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
import UserEditPasswordPage from "../pages/UserEditPasswordPage.vue";
import EditTags from "../pages/UserEditTags.vue";


//3. 定义路由关系，由一个数组确定

export const routes = [
    {path: '/login', component: UserLoginPage},
    {path:'/index',component: BasicLayout, redirect: '/',
    children:[
        {path: '/',title:"伙伴匹配",component : Index},
        {path: '/team',title:"找队伍",component: TeamPage},
        {path: '/user', title:"个人中心", component: UserPage},
        {path: '/search', title:"找队友", component: Search},
        {path: '/user/edit',title:"更新个人信息", component: UserEdit},
        {path: '/user/list', component: SearchResultPage},
        {path: '/team/add',title:"创建队伍", component: TeamAddPage },
        {path: '/team/update',title:"更新队伍", component: TeamUpdatePage},
        {path: '/user/editGender',title:"更新个人信息", component: UserEditGenderPage},
        {path: '/user/update',title:"更新个人信息", component: UserUpdatePage},
        {path: '/user/team/join', title:"我加入的队伍",component: UserTeamJoinPage},
        {path: '/user/team/create', title:"我创建的队伍", component: UserTeamCreatePage},
        {path: '/user/update/password', title: "更新密码", component: UserEditPasswordPage},
        {path: '/user/editTags', title: '更新个人标签',component: EditTags}
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
