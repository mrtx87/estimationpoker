import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {WebsocketService} from "@/services/websocket-service";
import './assets/css/main.css';
import {createPinia} from "pinia";
import {createRouter, createWebHashHistory} from 'vue-router'
import {ROOM_ROUTE} from "@/constants/vue-constants";
import {AppService} from "@/services/app-service";
import Toast, {PluginOptions} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


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

const options = {
    position: "bottom-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    maxToasts: 20,
    newestOnTop: true
};

const app = createApp(App);
app.config.globalProperties.$websocketService = new WebsocketService();
app.config.globalProperties.$appService = new AppService();
app.use(router)
app.use(createPinia());
app.use(Toast, options);
app.mount('#app');
