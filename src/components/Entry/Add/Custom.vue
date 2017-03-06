<template>
  <div class="entry-add--custom page page--padded page--menu">
    <form-custom @submit="onSubmit"></form-custom>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import uuid from 'uuid'
import { CUSTOM } from 'api'
import FormCustom from 'components/Entry/Common/Custom'

export default {
  name: 'AddCustom',
  components: { FormCustom },
  methods: {
    onSubmit(dataFood) {
      const newCacheUUID = uuid.v4()

      store.commit('foodCache/add', {
        uuid: newCacheUUID,
        id: newCacheUUID,
        timesLogged: 0,
        source: CUSTOM,
        dataFood,
      })

      router.go(-1)
    },
  },
}
</script>