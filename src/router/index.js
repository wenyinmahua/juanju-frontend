//1. 导入vue-router
import { createRouter, createWebHistory} from "vue-router";
//2. 导入页面组件
import Index from "../pages/IndexPage.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import Search from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";

//3. 定义路由关系，由一个数组确定

const routes = [
    {path: '/',component : Index},
    {path: '/team',component: Team},
    {path: '/user', component: User},
    {path: '/search', component: Search},
    {path: '/user/edit', component: UserEdit},
    {path: '/user/list', component: SearchResultPage}
]

//4. 创建路由器
const router = createRouter({
    history : createWebHistory(),
    routes : routes
})
//5. 导出router函数
export default router;
