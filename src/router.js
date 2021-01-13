import Vue from "vue";
import Router from "vue-router";

import UserProfile from "./pages/UserProfile.vue";
import Users from "./pages/Users.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Users,
      name: "all users",
      props: {
        gender: "all",
      },
      meta: {isUsers: true}
    },
    {
      path: "/male",
      component: Users,
      name: "male users",
      props: {
        gender: "male",
      },
      meta: {isUsers: true}
    },
    {
        path: "/female",
        component: Users,
        name: "female users",
        props: {
          gender: "female",
        },
        meta: {isUsers: true}
      },
    {
      path: "/users/:email",
      component: UserProfile,
      name: "user",
      meta: {isUsers: false}
    },
  ],
});
