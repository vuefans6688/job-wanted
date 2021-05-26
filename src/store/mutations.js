export default {
  /**
   * 修改用户信息
   * @param {*} state
   * @param {*} userInfo
   */
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },

  /**
   * 修改点赞文章
   * @param {*} state
   * @param {*} userInfo
   */
  SET_STAR_ARTICLES (state, starArticles) {
    state.userInfo.starArticles = starArticles
  },

  /**
   * 修改点赞评论
   * @param {*} state
   * @param {*} userInfo
   */
  SET_STAR_ARTICLE_COMMENTS (state, starComments) {
    state.userInfo.starComments = starComments
  },

  /**
   * 修改收藏文章
   * @param {*} state
   * @param {*} userInfo
   */
  SET_COLLECT_ARTICLES (state, collectArticles) {
    state.userInfo.collectArticles = collectArticles
  },

  // 修改收藏的面试题
  SET_COLLECT_QUESTIONS (state, collectQuestions) {
    // 保存试题
    state.userInfo.collectQuestions = collectQuestions
  },

  // 设置面试题
  SET_QUESTION (state, questionList) {
    // 保存面试题
    state.questionList = questionList
  },

  // 清空面试题
  CLEAR_QUESTION (state) {
    state.questionList = []
  }
}