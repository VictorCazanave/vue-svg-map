
<script setup lang="ts">
import { ref } from 'vue'
import France from '@svg-maps/france.regions'
import { SvgMap } from 'vue-svg-map/src/index.ts'
import { getLocationName } from '../utilities'

const URL: Record<string, string> = {
	ara: 'https://en.wikipedia.org/wiki/Auvergne-Rh%C3%B4ne-Alpes',
	bfc: 'https://en.wikipedia.org/wiki/Bourgogne-Franche-Comt%C3%A9',
	bre: 'https://en.wikipedia.org/wiki/Brittany_(administrative_region)',
	cvl: 'https://en.wikipedia.org/wiki/Centre-Val_de_Loire',
	cor: 'https://en.wikipedia.org/wiki/Corsica',
	ges: 'https://en.wikipedia.org/wiki/Grand_Est',
	hdf: 'https://en.wikipedia.org/wiki/Hauts-de-France',
	idf: 'https://en.wikipedia.org/wiki/%C3%8Ele-de-France',
	nor: 'https://en.wikipedia.org/wiki/Normandy',
	naq: 'https://en.wikipedia.org/wiki/Nouvelle-Aquitaine',
	occ: 'https://en.wikipedia.org/wiki/Occitanie_(administrative_region)',
	pdl: 'https://en.wikipedia.org/wiki/Pays_de_la_Loire',
	pac: 'https://en.wikipedia.org/wiki/Provence-Alpes-C%C3%B4te_d%27Azur',
}

const pointedLocation = ref<string>('')
const focusedLocation = ref<string>('')
const clickedLocation = ref<string>('')

function pointLocation(event: MouseEvent) {
  pointedLocation.value = getLocationName((event.target as SVGElement))
}

function unpointLocation() {
  pointedLocation.value = ''
}

function focusLocation(event: FocusEvent) {
  focusedLocation.value = getLocationName((event.target as SVGElement))
}

function blurLocation() {
  focusedLocation.value = ''
}

function clickLocation(event: MouseEvent) {
  clickedLocation.value = getLocationName((event.target as SVGElement))
  window.open(URL[(event.target as SVGElement)?.id], '_blank')
}
</script>

<template>
	<article class="example">
		<h2 class="example__title">
			France SVG map as links
		</h2>

		<p class="example__info">
			<span>
				Pointed location: {{ pointedLocation }}
			</span>
			<span>
				Focused location: {{ focusedLocation }}
			</span>
			<span>
				Clicked location: {{ clickedLocation }}
			</span>
		</p>

    <SvgMap
      :map="France"
      location-role="link"
      class="example__map"
      @mouseover="pointLocation"
      @mouseout="unpointLocation"
      @focus="focusLocation"
      @blur="blurLocation"
      @click="clickLocation"
    />
	</article>
</template>
