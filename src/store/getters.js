const getters = {
  appKey: state => state.common.appKey,
  website: state => state.common.website,
  username: state => state.user.username,
  // menu: state => state.user.menu,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
}
export default getters
