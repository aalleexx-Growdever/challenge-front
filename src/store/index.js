import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import courses from './modules/courses';
import enrollments from './modules/enrollments';
import students from './modules/students';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    courses,
    enrollments,
    students,
  },
});
