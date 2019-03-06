<template>
  <div class="home">
    <transition-group>
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
      return this.$store.getters.sortedDecks
    }
  },
  created () {
    this.$store.dispatch('fetchDecks')
  }
}
</script>

<style lang="scss" scoped>
</style>
