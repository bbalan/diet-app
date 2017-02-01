<template>
  <div class="slide {class}">
    <slot>
      Slide content goes here.
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  props: [
    'id',
  ],
  data() {
    return {}
  },
}
</script>

<style scoped>

</style>