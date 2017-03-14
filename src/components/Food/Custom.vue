<template>
  <div class="food-custom page page--tabs page--bg-grey">

    <!--<pre>{{ customFoods }}</pre>-->

    <!--<md-list class="md-double-line">-->
    <md-list>
      <md-list-item v-for="food in customFoods" class="food-custom__item">

        <router-link
          :to="{ name: 'addFood', params: { source: food.source, id: food.id }}"
          class="custom__link">

          <!--<md-icon class="favorites__star">star</md-icon>-->

          <div class="md-list-text-container">
            <span class="custom__name wordwrap--fade">
              {{ food.dataFood.name | capitalize }}
            </span>
            <!--<span class="custom__times">
              Logged {{ food.timesLogged }} time{{ food.timesLogged === 1 ? '' : 's' }}
            </span>-->
          </div>
        </router-link>

        <md-button class="md-icon-button md-list-action food-custom__edit" @click.native="onEdit(food.id)">
          <md-icon>edit</md-icon>
        </md-button>

        <md-divider></md-divider>

      </md-list-item>

      <md-whiteframe md-elevation="2" v-if="!customFoods.length" class="page--padded custom__empty">
        Foods that you create manually will appear here.
        <br><br>
        Tap the <md-icon>add</md-icon> button to create a new food item.
      </md-whiteframe>
    </md-list>

    <md-button class="md-fab md-fab-bottom-right" @click.native="onAdd">
      <md-icon>add</md-icon>
    </md-button>

  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import { capitalize } from 'util/filters'
import * as API from 'util/api'

export default {
  name: 'Custom',
  filters: { capitalize },
  computed: {
    customFoods() {
      const foods = []
      Object.entries(store.state.foodCache).forEach((item) => {
        if (item[1].source === API.CUSTOM &&
            item[1].dataFood.name &&
            item[1].dataFood.serving &&
            item[1].dataFood.calories) {
          foods.push(item[1])
        }
      })
      return foods
    },
  },
  methods: {
    onAdd() {
      router.push({ name: 'addCustom' })
    },
    onEdit(uuid) {
      router.push({ name: 'editCustom', params: { uuid } })
    },
  },
}
</script>

<style scoped lang="stylus">
.food-custom
  &__item a
    padding-right 64px !important
  &__edit
    position absolute !important
    top 0
    right -6px
    padding 12px 18px 12px 12px !important
    width 54px !important
    height 48px !important
    border-radius 0 !important
</style>