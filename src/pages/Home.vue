<template>
  <div class="home">
    <h1>Home</h1>
    <transition-group>
      <div v-for="array in cardsArray" :key="array">
        {{ array }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      cardsArray1: ['1', '2', '3'],
      cardsArray2: ['4', '5', '6'],
      cardsArray3: ['7', '8', '9']
    }
  },
  computed: {
    currentTab () {
      return this.$store.getters['currentTab']
    },
    cardsArray () {
      if (this.currentTab === 2) return this.cardsArray2
      if (this.currentTab === 3) return this.cardsArray3
      else return this.cardsArray1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
