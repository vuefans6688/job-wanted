export default {
  
  // 获取点赞的文章
  starArticles (state) {
    if (state.userInfo) {
      return state.userInfo.starArticles
    }
    return []
  },

  // 获取点赞评论
  starComments (state) {
    if (state.userInfo) {
      return state.userInfo.starComments
    }
    return []
  },

  // 获取收藏文章
  collectArticles (state) {
    if (state.userInfo) {
      return state.userInfo.collectArticles
    }
    return []
  },

  // 获取收藏面试题
  collectQuestions (state) {
    if (state.userInfo) {
      return state.userInfo.collectQuestions
    }
    return []
  },
  
  // 获取面试题
  getQuestion (state) {
    return function (questionId) {
      return state.questions[questionId]
    }
  }
}