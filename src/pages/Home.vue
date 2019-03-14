<template>
  <div class="home">
    <transition-group>
      <div class="center" key="spinner" v-if="isLoading">
        <md-progress-spinner class="spinner" md-mode="indeterminate"></md-progress-spinner>
      </div>
      <Card v-for="array in cardsArray" :key="array.id" :deck="array"/>
    </transition-group>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  name: 'Home',
  components: {
    Card
  },
  data: () => ({}),
  computed: {
    currentTab () {
      return this.$store.getters['currentTab']
    },
    cardsArray () {
      return this.$store.getters.sortedDecks
    },
    isLoading () {
      return this.$store.getters.contentLoading
    }
  },
  created () {
    this.$store.dispatch('fetchDecks')
  }
}
</script>

<style lang="scss" scoped>
.center {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
