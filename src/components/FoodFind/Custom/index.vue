<template>
  <div class="food-custom page page--tabs page--cards">

    <!--<pre>{{ customFoods }}</pre>-->

    <!--<md-list class="md-double-line">-->
    <md-list>
      <md-list-item v-for="food in customFoods">

        <router-link 
          :to="{ name: 'entryNew', params: { source: food.source, id: 'custom' }}"
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

          <md-button class="md-icon-button md-list-action">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
        </router-link>

        <md-divider></md-divider>

      </md-list-item>

      <div v-if="!customFoods.length" class="page--padded custom__empty">
        Foods that you create manually will appear here.
        <br><br>
        Tap the <md-icon>add</md-icon> button below to create a new food item.
      </div>
    </md-list>

    <md-button class="md-fab md-fab-bottom-right" @click.native="onAddCustomFood">
      <md-icon>add</md-icon>
    </md-button>

  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import { capitalize } from 'util/filters'

export default {
  name: 'Custom',
  filters: { capitalize },
  computed: {
    customFoods() {
      const foods = []
      Object.entries(store.state.foodCache).forEach((item) => {
        if (item[1].source === 'custom' &&
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
    onAddCustomFood() {
      router.push({ name: 'entryCustom' })
    },
  },
}
</script>