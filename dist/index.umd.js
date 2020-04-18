(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.VueSvgMap = {}));
}(this, (function (exports) { 'use strict';

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var LOCATION_DEFAULT_PROPERTIES = ['id', 'name', 'path'];

	var script = {
		name: 'SvgMap',
		props: {
			map: {
				type: Object,
				required: true,
				validator: function validator(map) {
					return typeof map.viewBox === 'string' &&
	          Array.isArray(map.locations) &&
	          map.locations.every(function (location) { return typeof location.path === 'string' && typeof location.id === 'string'; })
				},
			},
			locationClass: {
				type: [String, Function],
				default: null,
			},
			locationTabindex: {
				type: [String, Function],
				default: null,
			},
			locationRole: {
				type: String,
				default: null,
			},
			isLocationSelected: {
				type: Function,
				default: null,
			},
		},
		computed: {
			isLocationClassFunction: function isLocationClassFunction() {
				return typeof this.locationClass === 'function'
			},
			isLocationTabindexFunction: function isLocationTabindexFunction() {
				return typeof this.locationTabindex === 'function'
			},
		},
		methods: {
			/**
			 * Get custom properties of a location to add custom attributes to <path>
			 *
			 * @param {Object} location - Location to parse
			 * @returns {Object} Custom properties
			 */
			getLocationCustomProperties: function getLocationCustomProperties(location) {
				// Filter default properties to avoid invalid/duplicated attributes
				return Object.fromEntries(
					Object.entries(location).filter(function (ref) {
						var key = ref[0];

						return !LOCATION_DEFAULT_PROPERTIES.includes(key);
				})
				)
			},
		},
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    var options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    var hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            var originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            var existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	var __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "svg",
	    {
	      staticClass: "svg-map",
	      attrs: {
	        xmlns: "http://www.w3.org/2000/svg",
	        viewBox: _vm.map.viewBox,
	        "aria-label": _vm.map.label
	      }
	    },
	    [
	      _vm._t("before"),
	      _vm._v(" "),
	      _vm._l(_vm.map.locations, function(location, index) {
	        return _c(
	          "path",
	          _vm._g(
	            _vm._b(
	              {
	                key: location.id,
	                staticClass: "svg-map__location",
	                class: _vm.isLocationClassFunction
	                  ? _vm.locationClass(location, index)
	                  : _vm.locationClass,
	                attrs: {
	                  id: location.id,
	                  name: location.name,
	                  d: location.path,
	                  tabindex: _vm.isLocationTabindexFunction
	                    ? _vm.locationTabindex(location, index)
	                    : _vm.locationTabindex,
	                  role: _vm.locationRole,
	                  "aria-label": location.name,
	                  "aria-checked":
	                    _vm.isLocationSelected &&
	                    _vm.isLocationSelected(location, index)
	                }
	              },
	              "path",
	              _vm.getLocationCustomProperties(location),
	              false
	            ),
	            _vm.$listeners
	          )
	        )
	      }),
	      _vm._v(" "),
	      _vm._t("after")
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  var __vue_inject_styles__ = undefined;
	  /* scoped */
	  var __vue_scope_id__ = undefined;
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  var SvgMap = normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	//

	var script$1 = {
		name: 'CheckboxSvgMap',
		components: {
			SvgMap: SvgMap,
		},
		model: {
			event: 'change',
		},
		props: {
			// Ids of selected locations (used for v-model)
			value: {
				type: Array,
				default: function () { return []; },
			},
		},
		methods: {
			/**
		 	 * Indicate whether a location is selected
		 	 *
		 	 * @param {Object} location - Location DOM object
		 	 * @returns {boolean} True if the location is selected
			 */
			isLocationSelected: function isLocationSelected(location) {
				return this.value.some(function (selectedLocation) { return selectedLocation === location.id; })
			},

			/**
			 * Select/deselect a location
		 	 *
		 	 * @param {Event} event - Triggered event
		 	 */
			toggleLocation: function toggleLocation(event) {
				var locationElt = event.target;
				var selectedLocations;

				if (locationElt.attributes['aria-checked'] && locationElt.attributes['aria-checked'].value === 'true') {
					// Delete location
					selectedLocations = this.value.filter(function (location) { return location !== locationElt.id; });
				} else {
					// Add location
					selectedLocations = ( this.value ).concat( [locationElt.id]);
				}

				this.$emit('change', selectedLocations);
			},
		},
	};

	/* script */
	var __vue_script__$1 = script$1;

	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "svg-map",
	    _vm._g(
	      _vm._b(
	        {
	          attrs: {
	            role: "group",
	            "location-role": "checkbox",
	            "location-tabindex": "0",
	            "is-location-selected": _vm.isLocationSelected
	          },
	          on: {
	            click: _vm.toggleLocation,
	            keydown: function($event) {
	              if (
	                !$event.type.indexOf("key") &&
	                _vm._k($event.keyCode, "space", 32, $event.key, [
	                  " ",
	                  "Spacebar"
	                ])
	              ) {
	                return null
	              }
	              $event.preventDefault();
	              return _vm.toggleLocation($event)
	            }
	          },
	          scopedSlots: _vm._u(
	            [
	              _vm._l(_vm.$scopedSlots, function(_, slotName) {
	                return {
	                  key: slotName,
	                  fn: function(scope) {
	                    return [_vm._t(slotName, null, null, scope)]
	                  }
	                }
	              })
	            ],
	            null,
	            true
	          )
	        },
	        "svg-map",
	        _vm.$attrs,
	        false
	      ),
	      _vm.$listeners
	    )
	  )
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  var __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  var __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  var __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  var __vue_is_functional_template__$1 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  var CheckboxSvgMap = normalizeComponent(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	//

	var script$2 = {
		name: 'RadioSvgMap',
		components: {
			SvgMap: SvgMap,
		},
		model: {
			event: 'change',
		},
		props: {
			// Id of selected location (used for v-model)
			value: {
				type: String,
				default: null,
			},
		},
		mounted: function mounted() {
			this.locations = this.$refs.svg.$el.querySelectorAll('path');
		},
		methods: {
			/**
			 * Get tabindex value of a location
		   *
		   * @param {Object} location - Location object
		   * @param {number} index - Index of location
		   * @returns {string} Value of tabindex HTML attribute
		 	 */
			getLocationTabindex: function getLocationTabindex(location, index) {
				var tabindex = null;

				if (this.value) {
					// Only selected location is focusable
					tabindex = this.isLocationSelected(location) ? '0' : '-1';
				} else {
					// Only first location is focusable
					tabindex = index === 0 ? '0' : '-1';
				}

				return tabindex
			},

			/**
		 	 * Indicate whether a location is selected
		 	 *
		 	 * @param {Object} location - Location object
		 	 * @returns {boolean} True if the location is selected
		 	 */
			isLocationSelected: function isLocationSelected(location) {
				return this.value === location.id
			},

			/**
		 	 * Select a location
		 	 *
		 	 * @param {Node} location - DOM node of location to select
		 	 */
			selectLocation: function selectLocation(location) {
				// Select only if new location
				if (location.id !== this.value) {
					// Focus new selected location
					location.focus();

					// Emit id of selected location
					this.$emit('change', location.id);
				}
			},

			/**
		 	 * Select focused location if not already selected
		 	 *
		 	 * @param {Event} event - Triggered event
		 	 */
			toggleLocation: function toggleLocation(event) {
				var focusedLocation = event.target;

				if (this.value !== focusedLocation.id) {
					this.selectLocation(focusedLocation);
				}
			},

			/**
		 	 * Select next or first location
		 	 *
		 	 * @param {Event} event - Triggered event
		 	 */
			selectNextLocation: function selectNextLocation(event) {
				// Next sibling can be anything in `after` slot
				var nextSibling = event.target.nextSibling;
				var nextLocation = nextSibling && nextSibling.nodeName === 'path'
					? nextSibling
					: this.locations[0];

				this.selectLocation(nextLocation);
			},

			/**
		 	 * Select previous or last location
		 	 *
		 	 * @param {Event} event - Triggered event
		 	 */
			selectPreviousLocation: function selectPreviousLocation(event) {
				// Previous sibling can be anything in `before` slot
				var previousSibling = event.target.previousSibling;
				var previousLocation = previousSibling && previousSibling.nodeName === 'path'
					? previousSibling
					: this.locations[this.locations.length - 1];

				this.selectLocation(previousLocation);
			},
		},
	};

	/* script */
	var __vue_script__$2 = script$2;

	/* template */
	var __vue_render__$2 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "svg-map",
	    _vm._g(
	      _vm._b(
	        {
	          ref: "svg",
	          attrs: {
	            role: "radiogroup",
	            "location-role": "radio",
	            "location-tabindex": _vm.getLocationTabindex,
	            "is-location-selected": _vm.isLocationSelected
	          },
	          on: {
	            click: function($event) {
	              return _vm.selectLocation($event.target)
	            },
	            keydown: [
	              function($event) {
	                if (
	                  !$event.type.indexOf("key") &&
	                  _vm._k($event.keyCode, "space", 32, $event.key, [
	                    " ",
	                    "Spacebar"
	                  ])
	                ) {
	                  return null
	                }
	                $event.preventDefault();
	                return _vm.toggleLocation($event)
	              },
	              function($event) {
	                if (
	                  !$event.type.indexOf("key") &&
	                  _vm._k($event.keyCode, "down", 40, $event.key, [
	                    "Down",
	                    "ArrowDown"
	                  ])
	                ) {
	                  return null
	                }
	                $event.preventDefault();
	                return _vm.selectNextLocation($event)
	              },
	              function($event) {
	                if (
	                  !$event.type.indexOf("key") &&
	                  _vm._k($event.keyCode, "right", 39, $event.key, [
	                    "Right",
	                    "ArrowRight"
	                  ])
	                ) {
	                  return null
	                }
	                if ("button" in $event && $event.button !== 2) {
	                  return null
	                }
	                $event.preventDefault();
	                return _vm.selectNextLocation($event)
	              },
	              function($event) {
	                if (
	                  !$event.type.indexOf("key") &&
	                  _vm._k($event.keyCode, "up", 38, $event.key, [
	                    "Up",
	                    "ArrowUp"
	                  ])
	                ) {
	                  return null
	                }
	                $event.preventDefault();
	                return _vm.selectPreviousLocation($event)
	              },
	              function($event) {
	                if (
	                  !$event.type.indexOf("key") &&
	                  _vm._k($event.keyCode, "left", 37, $event.key, [
	                    "Left",
	                    "ArrowLeft"
	                  ])
	                ) {
	                  return null
	                }
	                if ("button" in $event && $event.button !== 0) {
	                  return null
	                }
	                $event.preventDefault();
	                return _vm.selectPreviousLocation($event)
	              }
	            ]
	          },
	          scopedSlots: _vm._u(
	            [
	              _vm._l(_vm.$scopedSlots, function(_, slotName) {
	                return {
	                  key: slotName,
	                  fn: function(scope) {
	                    return [_vm._t(slotName, null, null, scope)]
	                  }
	                }
	              })
	            ],
	            null,
	            true
	          )
	        },
	        "svg-map",
	        _vm.$attrs,
	        false
	      ),
	      _vm.$listeners
	    )
	  )
	};
	var __vue_staticRenderFns__$2 = [];
	__vue_render__$2._withStripped = true;

	  /* style */
	  var __vue_inject_styles__$2 = undefined;
	  /* scoped */
	  var __vue_scope_id__$2 = undefined;
	  /* module identifier */
	  var __vue_module_identifier__$2 = undefined;
	  /* functional template */
	  var __vue_is_functional_template__$2 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  var RadioSvgMap = normalizeComponent(
	    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
	    __vue_inject_styles__$2,
	    __vue_script__$2,
	    __vue_scope_id__$2,
	    __vue_is_functional_template__$2,
	    __vue_module_identifier__$2,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	// Based on: https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#What-does-my-packaged-component-look-like

	// Declare install function executed by Vue.use()
	function install(Vue) {
		if (install.installed) { return }
		install.installed = true;
		Vue.component('SvgMap', SvgMap);
		Vue.component('CheckboxSvgMap', CheckboxSvgMap);
		Vue.component('RadioSvgMap', RadioSvgMap);
	}

	// Create module definition for Vue.use()
	var plugin = {
		install: install,
	};

	// Auto-install when vue is found (eg. in browser via <script> tag)
	var GlobalVue = null;
	if (typeof window !== 'undefined') {
		GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
		GlobalVue = global.Vue;
	}
	if (GlobalVue) {
		GlobalVue.use(plugin);
	}

	exports.CheckboxSvgMap = CheckboxSvgMap;
	exports.RadioSvgMap = RadioSvgMap;
	exports.SvgMap = SvgMap;
	exports.default = plugin;
	exports.install = install;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
