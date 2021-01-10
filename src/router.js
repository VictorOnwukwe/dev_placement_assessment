import Vue from "vue";
import Router from "vue-router";

import User from "./pages/User.vue";
import Users from "./pages/Users.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Users,
            name: "users",
        },
        {
            path: '/user',
            component: User,
            name: 'user'
        }
    ]
})
