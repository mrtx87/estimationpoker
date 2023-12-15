import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {WebsocketService} from "@/services/websocket-service";
import './assets/css/main.css';
import {createPinia} from "pinia";
import {createRouter, createWebHashHistory} from 'vue-router'
import {HOME_ROUTE, ROOM_ROUTE} from "@/constants/vue-constants";
import {AppService} from "@/services/app-service";
import Toast, {PluginOptions} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import RoomHistory from "@/components/room-history.vue";
import AppContent from "@/components/app-content.vue";


const routes = [
    {
        path: HOME_ROUTE,
        name: 'Estimation Poker',
        component: RoomHistory
    },
    {
        path: `${ROOM_ROUTE}:roomId`,
        name: 'Estimation Poker',
        component: AppContent
    },
    {
        path: '/:catchAll(.*)',
        name: 'S9 Dokumentensuche',
        component: RoomHistory
    }
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
