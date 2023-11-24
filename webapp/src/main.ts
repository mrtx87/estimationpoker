import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './services/store'
import {WebsocketService} from "@/services/websocket-service";
import './assets/css/main.css';


const app = createApp(App);
app.config.globalProperties.$websocketService = new WebsocketService();
app.use(store).mount('#app');
