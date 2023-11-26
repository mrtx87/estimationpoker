import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {WebsocketService} from "@/services/websocket-service";
import './assets/css/main.css';
import {createPinia} from "pinia";
import {createRouter, createWebHashHistory} from 'vue-router'



const routes = [
    /*{
        path: `${REGISTER_ROUTE}:registerToken`,
        name: 'Register',
        component: Register
    },*/
    {
        path: '/:catchAll(.*)',
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
