/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from 'ving-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MigratingComponent extends Vue {
  mounted() {
    if (process.env.NODE_ENV === 'production') return
    if (!this.$vnode) return
    const { props, events }: { props: any, events: any } = this.getMigratingConfig()
    const { data, componentOptions } = this.$vnode
    const definedProps = data && data.attrs || {}
    const definedEvents = componentOptions && componentOptions.listeners || {}

    for (const propName in definedProps) {
      if (definedProps.hasOwnProperty(propName) && props[propName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Attribute]: ${props[propName]}`)
      }
    }

    for (const eventName in definedEvents) {
      if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Event]: ${events[eventName]}`)
      }
    }
  }

  getMigratingConfig() {
    return {
      props: {},
      events: {}
    }
  }
}
