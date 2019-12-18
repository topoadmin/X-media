const getters = {
  appKey: state => state.common.appKey,
  website: state => state.common.website,
  twoCachedViews: state => state.common.twoCachedViews,
  username: state => state.user.username,
  leftMenu: state => state.user.leftMenu,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
}
export default getters
