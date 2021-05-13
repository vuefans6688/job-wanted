import { info } from '@/api'

export default {
  async getUserInfo (context, isForce) {
    // 获取用户信息
    if (!context.state.userInfo || isForce) {
      const res = await info()
      const baseURL = 'https://autumnfish.cn/heimamm_server/'
      res.data.avatar += baseURL
      context.commit('SET_USER_INFO', res.data)
    }
  }
}