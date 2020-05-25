<template>
  <v-data-table :headers="headers" :items="vendors" sort-by="calories" class="elevation-0">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="title">Venors Management</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Vendor Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Address", value: "address" },
      { text: "Modified Date", value: "modifiedOn" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    vendors: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      phone: "",
      address: ""
    },
    defaultItem: {
      name: "",
      email: "",
      phone: "",
      address: ""
    }
  }),

  computed: {
    ...mapGetters(["getVendorsList"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async created() {
    await this.retrieveVendors();
    this.initialize();
  },

  methods: {
    ...mapActions(["retrieveVendors"]),

    initialize() {
      this.vendors = this.getVendorsList;
    },

    editItem(item) {
      this.editedIndex = this.vendors.indexOf(item);
      console.log("Edited index", this.editedIndex);
      console.log("Item passed ", item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.vendors.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.vendors.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.vendors[this.editedIndex], this.editedItem);
      } else {
        this.vendors.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped></style>
