<template>
  <v-app >

    <v-navigation-drawer v-model="drawer" app color="black" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Grupo A
          </v-list-item-title>
          <v-list-item-subtitle>
            Gerenciamento
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon class="mdi mdi-view-dashboard"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/manager">
          <v-list-item-icon>
            <v-icon class="mdi mdi-account-tie"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Manager</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group :value="false" prepend-icon="mdi mdi-account-tie-outline">
          <template v-slot:activator>
            <v-list-item-title>Admin</v-list-item-title>
          </template>

              <v-list-item to="/students">
                <v-list-item-icon>
                  <v-icon class="mdi mdi-account-group"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Alunos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item to="/enrollments">
                <v-list-item-icon>
                  <v-icon class="mdi mdi-file-document-multiple"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Matrículas</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item to="/courses">
                <v-list-item-icon>
                  <v-icon class="mdi mdi-notebook-multiple"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Cursos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

        </v-list-group>

        <v-list-item to="/about">
                <v-list-item-icon>
                  <v-icon class="mdi mdi-book-information-variant"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Sobre</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark absolute>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{title}}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import store from './store/index';

export default {
  data: () => ({
    store,
    drawer: false,
  }),
  computed: {
    title() {
      return this.$route.name;
    },
  },
};
</script>
