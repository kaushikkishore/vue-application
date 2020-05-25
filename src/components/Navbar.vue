<template>
  <div v-if="IsAutheticated">
    <v-app-bar app color="teal" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Vimano</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app class="pink" dark v-model="drawer">
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logoutUser">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      clipped: true,
      items: [
        { title: "Dashboard", path: "/", items: [] },
        {
          title: "Inventory",
          path: "/inventory",
          items: []
        },
        {
          title: "Vendor",
          path: "/vendor",
          items: []
        }
      ]
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    ...mapGetters({ IsAutheticated: "isLoggedIn" })
  }
};
</script>
