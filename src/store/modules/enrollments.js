import Vue from 'vue';

export default {
  state: {
    enrollments: [],
  },
  getters: {
    getEnrollments(state) {
      return state.enrollments;
    },
  },
  mutations: {
    setEnrollments(state, payload) {
      state.enrollments = payload;
    },
  },
  actions: {
    async requestEnrollments({ commit }) {
      await Vue.prototype.$http.get('/enrollments')
        .then((response) => {
          const { enrollments } = response.data.data.data;
          commit('setEnrollments', enrollments);
        })
        .catch((error) => error);
    },
  },
};
