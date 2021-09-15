import Vue from 'vue';

export default {
  state: {
    users: [],
    roles: [],
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getRoles(state) {
      return state.roles.map((role) => role.name);
    },
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setRoles(state, payload) {
      state.roles = payload;
    },
  },
  actions: {
    async requestUsers({ commit }) {
      await Vue.prototype.$http.get('/users')
        .then((response) => {
          const { users } = response.data.data.data;
          commit('setUsers', users);
        })
        .catch((error) => error);
    },
    async requestRoles({ commit }) {
      await Vue.prototype.$http.get('/roles')
        .then((response) => {
          const { roles } = response.data.data.data;
          commit('setRoles', roles);
        })
        .catch((error) => error);
    },
  },
};
