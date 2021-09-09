/* eslint-disable no-unused-expressions */
<template>
  <v-container class="container">

    <v-container class="tableContainer" v-show="showTable">
      <template>
        <v-data-table
          :headers="headers"
          :items="users"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.role"
                      label="Função"
                    ></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Enviar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Você está certo disso?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Apagar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-toolbar>
        </template>
        <template>
            <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      <template v-slot:no-data>
        <v-btn
        color="primary"
        @click="initialize"
        >
          Recarregar
        </v-btn>
      </template>
      </v-data-table>
    </template>
    </v-container>
  </v-container>
</template>

<script>
import ApiService from '../../services/ApiService';

export default {
  name: 'UsersList',
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      showTable: false,
      loading: true,
      error: false,
      users: [],
      roles: [],
      headers: [
        { text: 'ID', value: 'id', align: 'start' },
        { text: 'Nome', value: 'name' },
        { text: 'Função', value: 'role' },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        cpf: '',
        role: '',
      },
      defaultItem: {
        name: '',
        email: '',
        cpf: '',
        role: '',
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },
  methods: {
    initialize() {
      ApiService.doGet('/users')
        .then((resp) => {
          this.users = resp.data.users;
          console.log('---users init', this.users);
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
          this.showTable = true;
        });

      ApiService.doGet('/roles')
        .then((resp) => {
          this.roles = resp.data.roles;
          console.log('---roles', this.roles);
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log('salvando user', this.editedItem);
      } else {
        // criando
      }
      this.close();
    },
  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
};
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }
  .dialogs {
    text-align: center;
    padding: 5%;
  }
  .tableContainer {
    height: 'fit-content';
    max-height: 90vh;
    display: flex;
    justify-content: center;
  }
</style>
