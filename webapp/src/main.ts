import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {WebsocketService} from "@/services/websocket-service";
import './assets/css/main.css';
import {createPinia} from "pinia";
import {createRouter, createWebHashHistory} from 'vue-router'
import {ROOM_ROUTE} from "@/constants/vue-constants";



const routes = [
    {
        path: `/`,
        name: 'Estimation Poker',
        component: App
    },
    {
        path: `${ROOM_ROUTE}:roomId`,
        name: 'Estimation Poker',
        component: App
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(App);
app.config.globalProperties.$websocketService = new WebsocketService();
app.use(router)
app.use(createPinia());
app.mount('#app');
