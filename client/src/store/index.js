import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";
import { course } from "./auth.course";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    course
  }
});
