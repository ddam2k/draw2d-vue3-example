import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'

createApp(App).use(router).mount('#app')
