<template>
  <md-card md-with-hover class="md-card md-orange-card">
    <md-ripple>

      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ title }}</div>
          <div class="md-subhead">{{ subject }}{{ deadline && isTodo ? ` : ${deadline}` : '' }} </div>
        </md-card-header-text>

        <md-menu md-size="big" md-direction="bottom-end" style="user-select: none;">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item>
              <span class="no-select">Some</span>
              <md-icon>phone</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-header>

      <md-card-content v-if="deck.data().details">
        <pre style="line-height: 1.0; word-wrap: wrap;">{{ deck.data().details }}</pre>
      </md-card-content>

      <md-card-actions md-alignment="left">
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  name: 'Card',
  data: () => ({
    data: null,
    deckId: null
  }),
  props: {
    deck: Object
  },
  computed: {
    title () {
      return this.data.title
    },
    subject () {
      return this.data.subject
    },
    deadline () {
      return this.data.deadline
    },
    isTodo () {
      return this.data.isTodo
    }
  },
  created () {
    this.data = this.deck.data()
    this.deckId = this.deck.id
  }
}
</script>

<style lang="scss" scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    user-select: none;
}
.no-select {
  user-select: none;
}

</style>
