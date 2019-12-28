/**
 * Get the name of the targeted location
 *
 * @param {Node} node - HTML node
 * @returns {string} Name of the location
 */
export function getLocationName(node) {
	return node && node.attributes.name.value
}

/**
 * Get the name of the selected location
 *
 * @param {Object} map - Map of component
 * @param {string} locationId - Id of selected location
 * @returns {string} Name of the selected location
 */
export function getSelectedLocationName(map, locationId) {
	return locationId && map.locations.find(location => location.id === locationId).name
}
