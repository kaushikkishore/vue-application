<template>
  <v-container>
    <div>Home Page</div>
    <p>{{ user.token }}</p>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters({ user: "getloggedInUser" })
  }
};
</script>
