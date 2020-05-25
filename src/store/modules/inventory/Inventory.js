import axios from "axios";
import { APP_API } from "@/shared/config.js";
import { SAVE_INVENTORIES } from "@/store/modules/inventory/InventoryConstants.js";
import { parseJSON } from "date-fns";
import store from "@/store/index";
import { format } from "date-fns";
const dateFormat = "dd-MMM-yy"; //  HH:mm:ss

console.log("APP API", APP_API);
const inventoryAPI = `${APP_API}/api/inventory`;

const state = {
  inventories: [],
};
const getters = {
  getInventoryList: (state) => {
    return state.inventories;
  },
  getInventoryById: (state, id) => {
    return state.inventories.find((i) => i._id === id);
  },
};
const actions = {
  async retrieveInventory({ commit }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${store.getters.getToken}`;
    console.log("API URL", inventoryAPI);
    const response = await axios.get(inventoryAPI);
    console.log("Recieved data");
    const list = response.data.map((item) => {
      item.purchase.orderDate = parseJSON(item.purchase.orderDate);
      item.added_to_date = parseJSON(item.added_to_date);
      item.purchaseOrderDate = format(item.purchase.orderDate, dateFormat);
      return item;
    });

    commit(SAVE_INVENTORIES, list);

    return list;
  },
};
const mutations = {
  [SAVE_INVENTORIES](state, inventoryList) {
    console.log("calling mutations");
    state.inventories = inventoryList;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
