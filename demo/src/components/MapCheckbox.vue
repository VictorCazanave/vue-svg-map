<script setup lang="ts">
import { ref } from 'vue'
import Taiwan from '@svg-maps/taiwan.main'
import { SvgMapCheckbox } from 'vue-svg-map/src/index.ts'
import { getLocationName, getSelectedLocationName } from '../utilities'

const pointedLocation = ref<string>('')
const focusedLocation = ref<string>('')
const selectedLocations = ref<string[]>([])

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
</script>

<template>
    <article class="example">
        <h2 class="example__title">
            Taiwan SVG map as checkboxes
        </h2>

        <p class="example__info">
            <span>
                Pointed location: {{ pointedLocation }}
            </span>
            <span>
                Focused location: {{ focusedLocation }}
            </span>
            <span>
                Selected locations:
                <ul>
                    <li
                        v-for="location in selectedLocations"
                        :key="location"
                    >
                        {{ getSelectedLocationName(Taiwan, location) }}
                    </li>
                </ul>
            </span>
        </p>

        <SvgMapCheckbox
            v-model="selectedLocations"
            :map="Taiwan"
            class="example__map"
            @mouseover="pointLocation"
            @mouseout="unpointLocation"
            @focus="focusLocation"
            @blur="blurLocation"
        />
    </article>
</template>
