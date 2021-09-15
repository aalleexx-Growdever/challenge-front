import Vue from 'vue';

export default {
  state: {
    courses: [],
  },
  getters: {
    getCourses(state) {
      return state.courses;
    },

    getCoursesToList(state) {
      return state.courses.map((course) => course.course);
    },
  },
  mutations: {
    setCourses(state, payload) {
      state.courses = payload;
    },
  },
  actions: {
    async requestCourses({ commit }) {
      await Vue.prototype.$http.get('/courses')
        .then((response) => {
          const { courses } = response.data.data.data;
          commit('setCourses', courses);
        })
        .catch((error) => error);
    },
  },
};
