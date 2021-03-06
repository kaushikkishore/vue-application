import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login/login";
import Inventory from "./modules/inventory/Inventory.js";
import vendor from "./modules/vendor/vendor.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    Inventory,
    vendor,
  },
});
