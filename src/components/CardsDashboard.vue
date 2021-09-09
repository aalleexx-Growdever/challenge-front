<template>
  <v-container class="container">
    <v-card dark height="fit-content" width="40vw" elevation="24" raised shaped class="card">
    <v-card-title>{{this.items[this.index].title}}</v-card-title>
    <v-card-subtitle>
      {{this.items[this.index].subtitle}}
    </v-card-subtitle>
    <v-card-text>{{this.items[this.index].text1}}</v-card-text>
    <v-card-text v-if="this.items[this.index].text2">
      {{this.items[this.index].text2}}
    </v-card-text>
    <v-card-actions>
      <v-icon dark v-if="this.index >= 1" @click="changeCard('back')">
        mdi-arrow-left-circle
      </v-icon>
      <v-icon dark v-if="this.index < 3" @click="changeCard('forward')">
        mdi-arrow-right-circle
      </v-icon>
    </v-card-actions>
  </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CardsDashboard',
  data() {
    return {
      index: 0,
      items: [
        {
          title: 'Funcionamento e utilidades',
          subtitle: 'Um breve passo a passo',
          text1: 'Algumas dicas de como utilizar o sistema, que embora seja simples, espero que gostem.',
          text2: 'Ao clicar nas setas será possível avançar e retroceder os cards.',
        },
        {
          title: 'Rotas',
          subtitle: 'Manager',
          text1: 'Precisará de um login do tipo "Manager" para acesso, pois aqui estarão todas as opções de ações sobre dados da API.',
          text2: 'Login e senha: { Email: manager@email.com, Senha: managerpassword }, ambas já registradas na API.',
        },
        {
          title: 'Rotas',
          subtitle: 'Admin',
          text1: 'Precisará de um login do tipo "Admin" para acesso, aqui tratarei o pedido de evitar que alguns dados sejam editados.',
          text2: 'Login e senha: { Email: admin@email.com, Senha: adminpassword }, ambas já registradas na API.',
        },
        {
          title: 'Rotas',
          subtitle: 'About',
          text1: 'Apresentarei alguns cards com informações sobre os links do projeto do teste no GitHub e também meu Linkedin',
          text2: 'Fiquem a vontade para testar o projeto, fico aberto para críticas e conselhos. Peço para que visitem a rota About.',
        },
      ],
    };
  },
  methods: {
    changeCard(direction) {
      if (direction === 'back') {
        this.index -= 1;
      }
      if (direction === 'forward') {
        this.index += 1;
      }
    },
  },
};
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    padding: 3%;
  }
</style>
