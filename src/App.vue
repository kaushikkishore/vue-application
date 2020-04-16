<template>
  <v-app light>
    <!-- <router-view name="header"></router-view> -->
    <Navbar />
    <v-content class="mx-4 my-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",

  components: { Navbar }
};
</script>
