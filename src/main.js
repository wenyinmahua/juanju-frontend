import { createApp } from 'vue'
import App from './App.vue'
import { Button, NavBar, Icon, Tabbar, TabbarItem } from 'vant';
import { Space } from 'vant';
import router from './router'
import { Cell, CellGroup } from 'vant';
import { Form, Field, Card, Toast, Empty } from 'vant';

const app = createApp(App)
app.use(Button)
app.use(NavBar)
app.use(Icon)
app.use(Tabbar)
app.use(TabbarItem)
app.use(router)
app.use(Space)
app.use(Cell)
app.use(CellGroup)
app.use(Form)
app.use(Field)
app.use(Card)
app.use(Toast)
app.use(Empty)
app.mount('#app')




