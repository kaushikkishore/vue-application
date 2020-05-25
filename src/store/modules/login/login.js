import axios from "axios";
import {
  SAVE_USER,
  LOCAL_STORAGE_KEY_NAME,
  LOGOUT,
} from "@/store/modules/login/constants";
import { APP_API } from "@/shared/config.js";

const state = {
  loggedInUser: {
    name: "Robert Janmes",
    email: "as111s@vimano.biz",
    token: localStorage.getItem(LOCAL_STORAGE_KEY_NAME) || null,
    id: 123,
  },
};

const getters = {
  getloggedInUser: (state) => state.loggedInUser,
  getToken: (state) => state.loggedInUser.token,
  isLoggedIn: (state) => {
    return state.loggedInUser.token !== null;
  },
};

const actions = {
  async login({ commit }, credentials) {
    console.log("Test", process.env.VUE_APP_API);
    const response = await axios.post(`${APP_API}/auth/login`, credentials);
    console.log(response.data);
    commit(SAVE_USER, response.data);
    console.log("user saved");
    localStorage.setItem(
      LOCAL_STORAGE_KEY_NAME,
      response.data.token.split(" ")[1]
    );
    console.log("local storage saved");
  },

  async logout({ commit }) {
    commit(LOGOUT);
    localStorage.removeItem(LOCAL_STORAGE_KEY_NAME);
  },
};

const mutations = {
  [SAVE_USER](state, user) {
    console.log("muration", user.token);
    const token = user.token.split(" ")[1];
    state.loggedInUser.token = token;
    // Set default token for the all the API calls.
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  [LOGOUT](state) {
    state.loggedInUser.token = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
