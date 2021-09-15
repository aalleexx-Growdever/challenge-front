<template>
  <v-container class="container">
    <CardLink
      to="https://github.com/aalleexx-Growdever/challenge-full-stack-web-back"
      title="API DataBase"
      :text="backend()"
      img="git.png"
    />
    <CardLink
      to="https://github.com/aalleexx-Growdever/challenge-front"
      title="App gerenciamento"
      :text="frontend()"
      img="git.png"
    />
    <CardLink
      to="https://www.linkedin.com/in/alexsandro-becker-b627a3186/"
      title="Meu Linkedin"
      :text="linkedin()"
      img="linkedin.png"
    />
  </v-container>
</template>

<script>
import CardLink from '../components/CardLink.vue';
import { backend, frontend, linkedin } from '../assets/texts';

export default {
  name: 'About',
  title: 'About',
  components: {
    CardLink,
  },
  data() {
    return {
      backend,
      frontend,
      linkedin,
    };
  },
};
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
