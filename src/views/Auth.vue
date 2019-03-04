<template>
  <div class="page-container" style="min-height: 100vh;">
    <md-app style="height: 100vh;">
      <md-app-toolbar class="md-primary">
        <span class="md-title" style="flex: 1">{{ isLogin ? 'Login': 'Register' }}</span>
        <md-button @click="isLogin = !isLogin">{{ isLogin ? 'Register': 'Login' }}</md-button>
      </md-app-toolbar>

      <md-app-content>
        <div class="login" v-if="isLogin">
          <form class="md-layout" novalidate @submit.prevent="login">
            <md-card class="md-layout-item md-size-100">
              <md-card-header>
                <div class="md-title">Log In</div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="email">Email</label>
                    <md-input name="email" id="email" v-model="form.email" :disabled="sending"></md-input>
                  </md-field>
                  <md-field>
                    <label for="password">Password</label>
                    <md-input name="password" id="password" v-model="form.password" :disabled="sending"></md-input>
                  </md-field>
                </div>
              </md-card-content>

              <md-progress-bar md-mode="indetermiate" v-if="sending"></md-progress-bar>

              <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending">Log In</md-button>
              </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">Welcome back!</md-snackbar>
          </form>
        </div>

        <div class="register" v-else>
          <form class="md-layout" novalidate @submit.prevent="register">
            <md-card class="md-layout-item md-size-100">
              <md-card-header>
                <div class="md-title">Register</div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="name">Full Name</label>
                    <md-input name="name" id="name" v-model="form.name" :disabled="sending"></md-input>
                  </md-field>
                  <md-field>
                    <label for="email">Email</label>
                    <md-input name="email" id="email" v-model="form.email" :disabled="sending"></md-input>
                  </md-field>
                  <md-field>
                    <label for="password">Password</label>
                    <md-input name="password" id="password" v-model="form.password" :disabled="sending"></md-input>
                  </md-field>
                </div>
              </md-card-content>

              <md-progress-bar md-mode="indetermiate" v-if="sending"></md-progress-bar>

              <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending">Register</md-button>
              </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">Welcome! Lets start learning!</md-snackbar>
          </form>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// import { validationMixin } from 'vuelidate'
// import {
//   required,
//   email,
//   minLength,
//   maxLength
// } from 'vuelidate/lib/validators'
export default {
  name: 'Auth',
  data: () => ({
    isLogin: true,
    form: {
      name: null,
      email: null,
      password: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  methods: {
    login () {},
    register () {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
