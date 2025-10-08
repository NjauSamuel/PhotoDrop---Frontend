import { createRouter, createWebHistory } from "vue-router";
import Login from "./Pages/Login.vue";
import Home from "./Pages/Home.vue";
import MyImages from "./Pages/MyImages.vue";
import Signup from "./Pages/Signup.vue";
import DefaultLayout from "./Components/DefaultLayout.vue";
import NotFound from "./Pages/NotFound.vue";
import ForgotPassword from "./Pages/ForgotPassword.vue";

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            { path: '/', name: 'Home', component: Home },
            { path: '/images', name: 'MyImages', component: MyImages },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
