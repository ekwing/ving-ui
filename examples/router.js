import navConfig from './nav.config.json'

function loadDocs(path) {
  if (path === '/changelog') {
    return () => import('./pages/changelog')
  } else {
    return () => import(`./docs${path}.md`)
  }
}

function registerRoute(navConfig) {
  let routes = []
  routes.push({
    path: '/',
    redirect: '/quickstart',
    component: () => import('./pages/component.vue'),
    children: []
  })
  navConfig.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav)
        })
      })
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })
  function addRoute(page) {
    const component = loadDocs(page.path)
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    }
    routes[0].children.push(child)
  }
  return routes
}

let routes = registerRoute(navConfig)

export default routes
