<!--
	* @author:  Azil
	* @version: 0.0.1
	* @desc:  重定向页面
	* @route.query
-->

<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
