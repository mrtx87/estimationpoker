import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {WebsocketService} from "@/services/websocket-service";
import './assets/css/main.css';
import {createPinia} from "pinia";



const app = createApp(App);
app.config.globalProperties.$websocketService = new WebsocketService();
app.use(createPinia());
app.mount('#app');
