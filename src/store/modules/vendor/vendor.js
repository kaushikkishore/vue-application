import axios from "axios";
import { APP_API } from "@/shared/config.js";
import { parseJSON } from "date-fns";
import store from "@/store/index";
import { format } from "date-fns";
const dateFormat = "dd-MMM-yy"; //  HH:mm:ss
import { SAVE_VENDORS } from "@/store/modules/vendor/vendorConstants.js";

const vendorsAPI = `${APP_API}/api/vendor`;

const state = {
  vendors: [],
};

const getters = {
  getVendorsList: (state) => {
    return state.vendors;
  },

  getVendorById: (state, id) => {
    return state.vendors.find((item) => item._id === id);
  },
};

const actions = {
  retrieveVendors: async ({ commit }) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${store.getters.getToken}`;
    console.log("API URL to get vendors", vendorsAPI);
    const response = await axios.get(vendorsAPI);
    console.log("Recieved data from vendors");
    const list = response.data.map((item) => {
      item.modifiedLastDate = parseJSON(item.modifiedLastDate);
      item.createdDate = parseJSON(item.createdDate);
      item.createdOn = format(item.createdDate, dateFormat);
      item.modifiedOn = format(item.modifiedLastDate, dateFormat);
      return item;
    });

    commit(SAVE_VENDORS, list);

    return list;
  },
};

const mutations = {
  [SAVE_VENDORS](state, vendorsList) {
    console.log("calling mutations of vendors");
    state.vendors = vendorsList;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
