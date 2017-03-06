<template>
  <div class="entry-add--custom page page--padded page--menu">
    <form-custom
      :name="name"
      :serving="serving"
      :calories="calories"
      :fat="fat"
      :fatSaturated="fat_saturated"
      :fatTrans="fat_trans"
      :carbs="carbs"
      :fiber="fiber"
      :sugar="sugar"
      :protein="protein"></form-custom>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import FormCustom from 'components/Entry/Common/Custom'

export default {
  name: 'EditCustom',
  props: ['uuid'],
  components: { FormCustom },
  computed: {
    cachedFood() { return store.state.foodCache[this.uuid] },
    dataFood() { return this.cachedFood ? this.cachedFood.dataFood : null },
    name() { return this.dataFood ? this.dataFood.name : null },
    serving() { return this.dataFood ? this.dataFood.serving : null },
    calories() { return this.dataFood ? this.dataFood.calories : null },
    fat() { return this.dataFood ? this.dataFood.fat : null },
    fat_saturated() { return this.dataFood ? this.dataFood.fat_saturated : null },
    fat_trans() { return this.dataFood ? this.dataFood.fat_trans : null },
    carbs() { return this.dataFood ? this.dataFood.carbs : null },
    fiber() { return this.dataFood ? this.dataFood.fiber : null },
    sugar() { return this.dataFood ? this.dataFood.sugar : null },
    protein() { return this.dataFood ? this.dataFood.protein : null },
  },
  methods: {
    onSubmit(dataFood) {
      store.commit('foodCache/edit', { uuid: this.uuid, dataFood })
      router.go(-1)
    },
  },
}
</script>