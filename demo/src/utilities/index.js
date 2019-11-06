/**
 * Get the name of the targeted location
 *
 * @param {Node} node - HTML node
 * @returns {string} Name of the location
 */
export function getLocationName(node) {
	return node && node.attributes.name.value
}
