import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Manager from '../views/Manager.vue';
import About from '../views/About.vue';
import Students from '../components/admin/StudentsList.vue';
import Enrollments from '../components/admin/EnrollmentsList.vue';
import Courses from '../components/admin/CoursesList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/manager',
    name: 'Gerenciamento',
    component: Manager,
  },
  {
    path: '/students',
    name: 'Alunos',
    component: Students,
  },
  {
    path: '/enrollments',
    name: 'Matrículas',
    component: Enrollments,
  },
  {
    path: '/courses',
    name: 'Cursos',
    component: Courses,
  },
  {
    path: '/about',
    name: 'Sobre',
    component: About,
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
