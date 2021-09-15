<template>
  <v-container class="container">
    <v-dialog v-model="loading" persistent max-width="500px">
      <v-card dark>
        <v-card-text class="text-h6">
          Carregando informações...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-container v-if="!loading && !form && !login">
      <template>
        <v-data-table dark v-model="selected" single-select show-select :headers="headers"
          :items="students" item-key="academic_record">
          <template v-slot:top>
            <v-toolbar>
            <v-toolbar-title>Alunos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <template>
              <v-btn color="success" dark class="ml-1"  @click="newUser" :disabled="isSelected">
                <span class="mdi mdi-account-plus" style="font-size: 1.5rem;" />
              </v-btn>
              <v-btn color="primary" dark class="ml-1"  @click="editUser" :disabled="!isSelected">
                <span class="mdi mdi-account-edit" style="font-size: 1.5rem;" />
              </v-btn>
              <v-btn color="error" dark class="ml-1"  @click="deleteUser" :disabled="!isSelected">
                <span class="mdi mdi-delete" style="font-size: 1.5rem;" />
              </v-btn>
            </template>

            <v-dialog v-model="dialogDelete" max-width="300px" persistent>
              <v-card>
                <v-card-title class="text-h6">
                  Tem a certeza de que quer apagar o aluno?
                </v-card-title>
                <v-card-text class="text-h6">
                  {{deletingName}}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="warning" :loading="deleteLoading" :disabled="deleteLoading"
                    @click="confirmDelete">Apagar</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            </v-toolbar>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">
                Recarregar
              </v-btn>
            </template>
          </v-data-table>
        </template>
    </v-container>

    <v-container v-if="loggedIn" class="loggedInContainer">
      <v-avatar color="indigo">
        <v-icon dark class="mdi mdi-account-circle"></v-icon>
      </v-avatar>
      <span class="text-h6">{{userName}}</span>
      <span>{{userRole}}</span>
      <v-btn dark color="indigo" @click="loggout">
        Desconectar
      </v-btn>
    </v-container>

    <v-container class="form" v-show="form" max-width="50vw" dark>
      <span class="text-h5">{{ formTitle }}</span>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <v-text-field v-if="editing" v-model="studentForm.academic_record"
          label="RA" readonly></v-text-field>
          <ValidationProvider v-slot="{ errors }" name="Name"
            rules="required|alpha_spaces" ref="form" >
            <v-text-field v-model="studentForm.name" :error-messages="errors"
              label="Nome" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Email"
              rules="required|email" ref="form" >
              <v-text-field v-model="studentForm.email" :error-messages="errors"
                label="Email" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="CPF"
              :rules="{required: true , regex: /^(([0-9]){3}\.){2}([0-9]){3}-([0-9]){2}$/}"
              ref="form" >
              <v-text-field :readonly="editing" v-model="studentForm.cpf" :error-messages="errors"
                label="CPF" required></v-text-field>
            </ValidationProvider>
          </form>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="close">
            Cancelar
          </v-btn>
          <v-btn type="submit" color="success" @click="onSubmit" :loading="sendLoading"
          :disabled="sendLoading">
            Enviar
          </v-btn>
        </ValidationObserver>
    </v-container>

    <v-dialog v-model="dialogSuccess" max-width="300px">
      <v-card color="success" dark>
        <v-card-text>
          {{successMessage}}
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogError" max-width="300px">
      <v-card color="error" dark>
        <v-card-text>
          {{errorMessage}}
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-container class="form" v-show="login" max-width="400px">
      <span class="text-h5">Requisição exige verificação</span>
      <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(sendLogin)">
          <ValidationProvider v-slot="{ errors }" name="Email"
            rules="required|email" ref="loginForm" >
            <v-text-field v-model="loginForm.email" label="Email" required
            :error-messages="errors"></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Password"
            rules="required" ref="loginForm" >
            <v-text-field type="password" v-model="loginForm.password" label="Senha" required
            :error-messages="errors"></v-text-field>
          </ValidationProvider>
          <v-btn color="error" @click="closeLogin">
            Cancelar
          </v-btn>
          <v-btn type="submit" color="success" @click="sendLogin" :loading="loginLoading"
            :disabled="loginLoading">
            Verificar
          </v-btn>
        </form>
      </ValidationObserver>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'StudentsList',
  data() {
    return {
      loading: true,
      loginLoading: false,
      sendLoading: false,
      login: false,
      loggedIn: false,
      deleteLoading: false,
      selected: [],
      form: false,
      dialogDelete: false,
      dialogSuccess: false,
      dialogError: false,
      error: false,
      errorMessage: '',
      successMessage: '',
      userRole: null,
      userName: null,
      editing: false,
      deletingName: '',
      headers: [
        { text: 'RA', value: 'academic_record', align: 'start' },
        { text: 'NOME', value: 'name' },
        { text: 'EMAIL', value: 'email' },
        { text: 'CPF', value: 'cpf' },
      ],
      studentForm: {
        academic_record: '',
        name: '',
        email: '',
        cpf: '',
      },
      defaultStudentForm: {
        academic_record: '',
        name: '',
        email: '',
        cpf: '',
      },
      loginForm: {
        email: '',
        password: '',
      },
      defaultLoginForm: {
        email: '',
        password: '',
      },
    };
  },

  computed: {
    formTitle() {
      return this.editing === false ? 'Cadastrar Aluno' : 'Editar Aluno';
    },
    isSelected() {
      return this.selected.length !== 0;
    },
    students() {
      return this.$store.getters.getStudents;
    },
  },
  methods: {
    ...mapActions(['requestStudents']),

    async initialize() {
      try {
        this.loading = true;
        await this.requestStudents();
        this.loading = false;
      } catch {
        this.errorDialog(
          'Problemas na requisição dos dados. Por favor tente novamente.',
        );
      }
    },

    newUser() {
      if (this.areLoggedIn()) {
        this.editing = false;
        this.form = true;
        this.studentForm = { ...this.defaultStudentForm };
      } else {
        this.login = true;
      }
    },

    editUser() {
      if (this.areLoggedIn()) {
        this.editing = true;
        this.form = true;
        this.studentForm = { ...this.selected[0] };
      } else {
        this.login = true;
      }
    },

    deleteUser() {
      if (this.areLoggedIn()) {
        const { name } = this.selected[0];
        this.deletingName = name;
        this.dialogDelete = true;
      } else {
        this.login = true;
      }
    },

    async confirmDelete() {
      this.deleteLoading = true;
      const id = this.selected[0].academic_record;
      await this.$http.delete(`/students/${id}`).then(() => {
        this.successDialog(
          'Dados apagados com sucesso!',
        );
        this.selected = [];
      }).catch(() => {
        this.errorDialog(
          'Falha ao apagar os dados. Por favor tente novamente.',
        );
      });
      this.closeDelete();
    },

    close() {
      this.sendLoading = false;
      this.form = false;
      this.editing = false;
      this.studentForm = { ...this.defaultStudentForm };
      this.$refs.form.reset();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.deleteLoading = false;
      this.deletingName = '';
    },

    async onSubmit() {
      if (this.editing) {
        this.sendLoading = true;
        const id = this.selected[0].academic_record;
        await this.$refs.form.validate().then((success) => {
          if (success === true) {
            this.$http.put(`/students/${id}`, this.studentForm)
              .then(() => {
                this.successDialog(
                  'Dados editados com sucesso!',
                );
              }).catch(() => {
                this.errorDialog(
                  'Falha as salvar os dados editados. Por favor, verifique os dados e tente novamente.',
                );
              })
              .finally(() => {
                this.initialize();
              });
            this.close();
          }
        });
      } else {
        this.sendLoading = true;
        await this.$refs.form.validate().then((success) => {
          if (success === true) {
            this.$http.post('/students', this.studentForm)
              .then(() => {
                this.successDialog(
                  'Dados cadastrados com sucesso!',
                );
              }).catch(() => {
                this.errorDialog(
                  'Falha as cadastrar os dados. Por favor, verifique os dados e tente novamente.',
                );
              })
              .finally(() => {
                this.initialize();
              });
            this.close();
          }
        });
      }
    },

    successDialog(message) {
      this.dialogSuccess = true;
      this.successMessage = message;
      setTimeout(() => {
        this.dialogSuccess = false;
        this.successMessage = '';
      }, 1000);
      this.initialize();
    },

    errorDialog(message) {
      this.loading = false;
      this.error = true;
      this.errorMessage = message;
      this.dialogError = true;
      setTimeout(() => {
        this.error = false;
        this.errorMessage = '';
        this.dialogError = false;
      }, 1000);
    },

    closeLogin() {
      this.login = false;
      this.loginLoading = false;
      this.loginForm = { ...this.defaultLoginForm };
      this.$refs.loginForm.reset();
    },

    areLoggedIn() {
      if (!this.userName || (this.userRole !== 'Manager' && this.userRole !== 'Admin')) {
        return false;
      }
      return true;
    },

    loggout() {
      this.userName = null;
      this.userRole = null;
      this.loggedIn = false;
    },

    async sendLogin() {
      this.loginLoading = true;
      await this.$refs.loginForm.validate().then((success) => {
        if (success === true) {
          this.$http.post('/login', this.loginForm)
            .then((response) => {
              const { name, role } = response.data.data.user;
              this.userName = name;
              this.userRole = role;
              this.loggedIn = true;
              this.successDialog(
                'Verificado com sucesso!',
              );
            })
            .catch(() => {
              this.loginLoading = false;
              this.errorDialog(
                'Falha ao verificar. Por favor, verifique os dados e tente novamente.',
              );
            })
            .finally(() => {
              this.loginLoading = false;
              this.closeLogin();
            });
        }
      });
    },
  },
  watch: {
    form(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  beforeMount() {
    this.initialize();
  },
};
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }
  .form {
    width: 40vw;
    background-color: #ccc;
    padding: 2%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-items: center;
  }
  .loggedInContainer {
    width: 15vw;
    height: 30vh;
    position: absolute;
    right: 1vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    border-radius: 30px;
  }
</style>
