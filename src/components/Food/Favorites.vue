<template>
  <div class="favorites page page--tabs page--bg-grey">

    <!-- TODO: dropdown for sorting by food.name or food.timesLogged -->

    <md-list class="md-double-line">
      <md-list-item v-for="food in cachedItems" v-if="food.timesLogged">

        <!-- TODO: grams input and Add button so we don't have to click through to entryAddFood -->

        <router-link
          :to="{ name: 'addFood', params: { source: food.source, id: food.id }}"
          class="favorites__link">

          <div class="md-list-text-container max-width page--padded">
            <span class="favorites__name wordwrap--fade">{{ food.name | capitalize }}</span>
            <span class="favorites__times">Logged {{ food.timesLogged }} time{{ food.timesLogged === 1 ? '' : 's' }}</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon>keyboard_arrow_right</md-icon>
            </md-button>
          </div>
        </router-link>

        <md-divider></md-divider>

      </md-list-item>

      <md-whiteframe md-elevation="2" v-if="!cachedItems.length" class="page--padded favorites__empty">
        <md-icon class="favorites__clock">access_time</md-icon>
        Foods that you eat often will appear here.
        <br><br>
        Tap the <md-icon>search</md-icon> icon in the menu to find food.
      </md-whiteframe>
    </md-list>

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
        .filter(cached => cached[1] && cached[1].timesLogged)
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
        .sort((a, b) => {
          if (!a.timesLogged && b.timesLogged) return 1
          if (a.timesLogged && !b.timesLogged) return -1
          if (a.timesLogged === b.TimesLogged) return 0
          return a.timesLogged < b.timesLogged ? 1 : -1
        })
    },
  },
}
</script>

<style scoped lang="stylus">
.favorites
  a
    padding 0 !important
  .md-list-action
    position absolute !important
    right 8px
    top 50%
    margin-top -20px !important
  .md-list-item-container
    button
      margin-left 0 !important
  &__star
    margin-right 16px !important
  &__clock
    color rgba(0,0,0,.54)
    margin-right 8px
    position absolute
    top 0
    left 16px
    display none
  &__empty
    padding 16px 24px
    margin 0
  &__name
    text-overflow clip
    position relative
    padding-right 20px
  .empty__search
    margin 16px 0 0 0
</style>