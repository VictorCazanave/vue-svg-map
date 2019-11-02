<template>
  <section class="examples">
    <h1 class="examples__title">
      Examples of <a href="https://www.npmjs.com/package/vue-svg-map">vue-svg-map</a>
    </h1>
    <checkbox-map />
    <radio-map />
    <link-map />
    <tooltip-heat-map />
  </section>
</template>

<script>
import CheckboxMap from './components/checkbox-map.vue'
import RadioMap from './components/radio-map.vue'
import LinkMap from './components/link-map.vue'
import TooltipHeatMap from './components/tooltip-heat-map.vue'

export default {
	name: 'App',
	components: {
		CheckboxMap,
		RadioMap,
		LinkMap,
		TooltipHeatMap,
	},
}
</script>
