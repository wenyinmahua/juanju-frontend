import { createApp } from 'vue'
import App from './App.vue'
import { Button, NavBar, Icon, Tabbar, TabbarItem } from 'vant';
import { Space } from 'vant';
import router from './router'
const app = createApp(App)
app.use(Button)
app.use(NavBar)
app.use(Icon)
app.use(Tabbar)
app.use(TabbarItem)
app.use(router)
app.use(Space)
app.mount('#app')




