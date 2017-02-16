<template>
  <div class="favorites grid__outer page page--tabs page--cards">

    <md-card>
      <md-list class="md-double-line">
        <md-list-item v-for="food in cachedItems">

          <router-link 
            :to="{ name: 'newFood', params: { source: food.source, id: food.id }}"
            class="favorites__link">

            <!--<md-icon class="favorites__star">star</md-icon>-->
            
            <div class="md-list-text-container">
              <span class="favorites__name">{{ food.name | capitalize }}</span>
              <span class="favorites__times">Logged {{ food.timesLogged }} time{{ food.timesLogged === 1 ? '' : 's' }}</span>
            </div>

            <md-button class="md-icon-button md-list-action">
              <md-icon>keyboard_arrow_right</md-icon>
            </md-button>
          </router-link>

          <md-divider></md-divider>

        </md-list-item>
      </md-list>

      <div v-if="!cachedItems.length" class="grid__outer favorites__empty">
        <md-icon class="favorites__clock">access_time</md-icon>
        Foods that you log often will appear here.
      </div>
    </md-card>

  </div>
</template>

<script>
import store from 'store'
import { capitalize } from 'util/filters'

export default {
  name: 'Favorites',
  filters: { capitalize },
  data() {
    return {
      favorites: [],
    }
  },
  computed: {
    cachedItems() {
      return Object
        .entries(store.state.foodCache)
        .map((cached) => {
          const val = cached[1]
          const data = val.dataFood

          if (data) {
            return {
              source: val.source,
              id: val.id,
              name: data.name,
              timesLogged: val.timesLogged,
            }
          }

          return {}
        })
        .sort((a, b) => a.timesLogged < b.timesLogged)
    },
  },
}
</script>

<style scoped lang="stylus">
.favorites
  .md-list-item-container
    button
      margin-left 0 !important
  &__star
    margin-right 16px !important
  &__clock
    color rgba(0,0,0,.54)
    margin-right 8px
  &__empty
    padding-top 24px !important
    padding-bottom 24px !important
  &__name
    text-overflow clip !important
    position relative
    &:after
      pointer-events none
      display block
      content ''
      width 25px
      height 100%
      position absolute
      top 0
      right 0
      background linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)
</style>