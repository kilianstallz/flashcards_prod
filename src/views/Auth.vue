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
                    <md-input name="email" id="email" type="email" v-model="form.email" :disabled="sending"></md-input>
                  </md-field>
                  <md-field>
                    <label for="password">Password</label>
                    <md-input name="password" id="password" type="password" v-model="form.password" :disabled="sending"></md-input>
                  </md-field>
                </div>
              </md-card-content>

              <md-progress-spinner md-mode="indeterminate" v-if="sending"></md-progress-spinner>

              <md-card-actions>
                <md-button type="submit" class="md-primary" @click="login" :disabled="sending">Log In</md-button>
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
                    <md-input name="email" type="email" id="email" v-model="form.email" :disabled="sending"></md-input>
                  </md-field>
                  <md-field>
                    <label for="password">Password</label>
                    <md-input name="password" type="password" id="password" v-model="form.password" :disabled="sending"></md-input>
                  </md-field>
                </div>
              </md-card-content>

              <md-progress-spinner md-mode="indeterminate" v-if="sending"></md-progress-spinner>

              <md-card-actions>
                <md-button type="submit" class="md-primary" @click="register" :disabled="sending">Register</md-button>
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
import router from '../router'
const fb = require('../db/firebaseConfig')

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
    async login () {
      fb.auth.signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(user => {
          this.sending = true
          this.$store.commit('SET_CURRENT_USER', user.user)
          this.$store.dispatch('fetchUserProfile')
          console.log('Auth.vue: loggedIn')
        })
        .then(user => {
          const firstTimeSignUp = fb.usersCollection.doc(fb.currentUser.uid) || false
          this.$store.state.firstTimeSignUp = firstTimeSignUp
          this.$store.state.firstTimeSignUp ? this.welcomeSetup() : this.redirect()
        })
        .catch(err => {
          console.log(err)
          this.userSaved = false
          this.sending = false
        })
    },
    register () {
      console.log(this.form)
    },
    welcomeSetup () {
      console.log('welcomeSetup')
      this.$router.replace('/profile/welcome')
    },
    redirect () {
      console.log('push')
      this.userSaved = true
      this.$route.query.redirect ? router.push(this.$route.query.redirect) : router.replace('/dashboard')
    }
  },
  computed: {
    isLoggedIn () {
      return !(!fb.auth.currentUser)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
