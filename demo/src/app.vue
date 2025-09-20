<script setup lang="ts">
import MapCheckbox from '@/components/MapCheckbox.vue'
import MapRadio from './components/MapRadio.vue'
import MapLink from '@/components/MapLink.vue'
import MapTooltipHeat from '@/components/MapTooltipHeat.vue'

</script>

<template>
  <h1 class="title">
    Examples of <a href="https://www.npmjs.com/package/vue-svg-map">vue-svg-map</a>
  </h1>

  <main>
    <MapCheckbox />
    <MapRadio />
    <MapLink />
    <MapTooltipHeat />
  </main>
</template>

<style scoped>
.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 5rem;
}
</style>
