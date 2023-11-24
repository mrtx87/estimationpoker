import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'


import {createPinia} from "pinia";
import './assets/css/main.css';
import {HOME_ROUTE} from "./util/utils";
import Content from "./components/content.vue";

const app = createApp(App);


const routes = [
    {
        path: HOME_ROUTE,
        name: 'Hauptseite',
        component: Content
    },
    /*{
        path: '/:catchAll(.*)',
        name: 'S9 Dokumentensuche',
        component: AppBody
    }*/
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


app.use(router)
app.use(createPinia());
app.mount('#app');