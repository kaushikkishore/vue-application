<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login to Vimano</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email address"
                  name="login"
                  prepend-icon="person"
                  type="text"
                  v-model="email"
                  class="pl-2"
                />
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  v-model="password"
                  class="pl-2"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="autheticate($event)" dark color="pink"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login", "logout"]),
    async autheticate(e) {
      e.preventDefault();
      console.log("Clicked");
      this.$store.dispatch("login", {});
      await this.login({
        email: this.email,
        password: this.password
      });
      console.log("done");
      this.$router.push({ name: "Inventory" });
    }
  }
};
</script>

<style scoped></style>
