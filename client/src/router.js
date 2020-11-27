import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Dashboard.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
