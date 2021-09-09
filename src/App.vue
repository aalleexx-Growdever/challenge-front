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
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          @click="routing(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
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
    title: 'Dashboard',
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Manager', icon: 'mdi-account-tie', to: '/manager' },
      { title: 'Admin', icon: 'mdi-account-tie-outline', to: '/admin' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
  }),
  methods: {
    routing(title) {
      this.title = title;
    },
  },
};
</script>
