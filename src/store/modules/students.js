import Vue from 'vue';

export default {
  state: {
    students: [],
  },
  getters: {
    getStudents(state) {
      return state.students;
    },
  },
  mutations: {
    setStudents(state, payload) {
      state.students = payload;
    },
  },
  actions: {
    async requestStudents({ commit }) {
      await Vue.prototype.$http.get('/students')
        .then((response) => {
          const { students } = response.data.data.data;
          commit('setStudents', students);
        })
        .catch((error) => error);
    },
  },
};
