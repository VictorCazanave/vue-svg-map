<template>
	<article class="examples__block">
		<h2 class="examples__block__title">
			France SVG map as links
		</h2>
		<div class="examples__block__info">
			<div class="examples__block__info__item">
				Pointed location: {{ pointedLocation }}
			</div>
			<div class="examples__block__info__item">
				Focused location: {{ focusedLocation }}
			</div>
			<div class="examples__block__info__item">
				Clicked location: {{ clickedLocation }}
			</div>
		</div>
		<div class="examples__block__map">
			<svg-map
				:map="France"
				location-role="link"
				@mouseover="pointLocation"
				@mouseout="unpointLocation"
				@focus="focusLocation"
				@blur="blurLocation"
				@click="clickLocation"
			/>
		</div>
	</article>
</template>

<script>
import France from '@svg-maps/france.regions'
import { getLocationName } from '../utilities'
import SvgMap from '../../../src/components/svg-map.vue'

const URL = {
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

export default {
	name: 'LinkMap',
	components: {
		SvgMap,
	},
	data() {
		return {
			France,
			pointedLocation: null,
			focusedLocation: null,
			clickedLocation: null,
		}
	},
	methods: {
		pointLocation(event) {
			this.pointedLocation = getLocationName(event.target)
		},
		unpointLocation(event) {
			this.pointedLocation = null
		},
		focusLocation(event) {
			this.focusedLocation = getLocationName(event.target)
		},
		blurLocation(event) {
			this.focusedLocation = null
		},
		clickLocation(event) {
			this.clickedLocation = getLocationName(event.target)
			window.open(URL[event.target.id], '_blank')
		},
	},
}
</script>
