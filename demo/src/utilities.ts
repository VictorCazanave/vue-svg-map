import type { Map } from '../../src/types'

/**
 * Get name of location from its DOM element
 *
 * @param element - DOM element
 * @returns Name of the location
 */
export function getLocationName(element: SVGElement): string {
	return element.attributes.getNamedItem('aria-label')?.value || ''
}

/**
 * Get name of selected location
 *
 * @param map - Map of component
 * @param locationId - Id of selected location
 * @returns Name of selected location
 */
export function getSelectedLocationName(map: Map, locationId: string): string {
	return map.locations.find(location => location.id === locationId)?.name || ''
}
