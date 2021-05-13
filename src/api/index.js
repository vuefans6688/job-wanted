import request from '@/utils/http'

/**
 * 获取验证码
 * @param {} params
 */
export function getCode (data) {
  return request({
    url: '/au/code',
    method: 'post',
    data
  })
}

/**
 * 用户登录
 * @param {} params
 */
export function login (data) {
  return request({
    url: '/au/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {} params
 */
export function info () {
  return request({
    url: '/au/info',
    method: 'get',
    // 需要携带token
    token: 'token'
  })
}

/**
 * 修改用户信息
 * @param {} params
 */
export function edit (data) {
  return request({
    url: '/au/edit',
    method: 'post',
    // 需要携带token
    token: 'token',
    data
  })
}

/**
 * 文件上传
 * @param {} params
 */
export function uploadAvatar (avatar) {
  const _data = new FormData()
  _data.append('files', avatar)
  return request({
    url: '/upload',
    method: 'post',
    // 需要携带token
    token: 'token',
    data: _data
  })
}
/**
 * 企业列表数据
 * @param {} params
 */
export function companyList (params) {
  return request({
    url: '/companies/list',
    method: 'get',
    params
  })
}

/**
 * 企业列表数据
 * @param {} params
 */
export function companyDetail (id) {
  return request({
    url: `/companies/${id}`,
    method: 'get'
  })
}
/**
 * 企业评论数据
 * @param {} params
 */
export function companyComments (data) {
  const { id, limit, start } = data
  return request({
    url: `/companies/${id}/comments`,
    method: 'get',
    params: {
      limit,
      start
    }
  })
}
/**
 * 企业职位数据
 * @param {} params
 */
export function companyPositions (data) {
  const { id, limit, start, city, experience, salary, type } = data
  return request({
    url: `/companies/${id}/positions`,
    method: 'get',
    params: {
      limit,
      start,
      city,
      experience,
      salary,
      type
    }
  })
}

/**
 * 添加评论数据
 * @param {} params
 */
export function addComment (data) {
  return request({
    url: '/comments',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 获取职位筛选条件
 * @param {} params
 */
export function positionFilters (id) {
  return request({
    url: `/companies/${id}/positionFilters`,
    method: 'get'
  })
}
/**
 * 获取职位详情
 * @param {} params
 */
export function positionDetail (id) {
  return request({
    url: `/positions/${id}`,
    method: 'get'
  })
}
/**
 * 获取面试技巧
 * @param {} params
 */
export function articlesTechnic (params) {
  return request({
    url: '/articles/technic',
    method: 'get',
    params,
    token: 'token'
  })
}
/**
 * 获取分享的面经
 * @param {} params
 */
export function articlesShare (params) {
  return request({
    url: '/articles/share',
    method: 'get',
    params,
    token: 'token'
  })
}
/**
 * 面试技巧详情
 * @param {} params
 */
export function articlesTechnicDetail (id) {
  return request({
    url: `/articles/technic/${id}`,
    method: 'get'
  })
}
/**
 * 面试技巧热搜
 * @param {} params
 */
export function articlesTechnicTopSearch () {
  return request({
    url: '/articles/technicTopSearch',
    method: 'get'
  })
}
/**
 * 面经 分享
 * @param {} params
 */
export function articlesShareDetail (id) {
  return request({
    url: `/articles/share/${id}`,
    method: 'get'
  })
}
/**
 * 面经分享热搜
 * @param {} params
 */
export function articlesShareTopSearch () {
  return request({
    url: '/articles/shareTopSearch',
    method: 'get'
  })
}
/**
 * 文章评论接口
 * @param {} params
 */
export function articleComments (params) {
  const { id, limit, start } = params
  return request({
    url: `/articles/comments/${id}`,
    method: 'get',
    params: {
      limit,
      start
    }
  })
}

/**
 * 发表文章评论接口
 * @param {} data
 */
export function publishComment (data) {
  return request({
    url: '/articles/comments',
    method: 'post',
    token: 'token',
    data
  })
}

/**
 * 点赞文章接口
 * @param {} data
 */
export function starArticle (data) {
  return request({
    url: '/articles/star',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 点赞文章评论接口
 * @param {} data
 */
export function starArticleComment (data) {
  return request({
    url: '/article-comments/star',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 收藏文章接口
 * @param {} data
 */
export function collectArticle (data) {
  return request({
    url: '/articles/collect',
    method: 'post',
    token: 'token',
    data
  })
}

/**
 * 分享文章图片接口
 * @param {} data
 */
export function shareImg (data) {
  return request({
    url: '/articles/shareImg',
    method: 'post',
    token: 'token',
    data
  })
}

/**
 * 热门统计数据接口
 * @param {} data
 */
export function topChartData () {
  return request({
    url: '/chart-data/hot',
    method: 'get'
  })
}
/**
 * 统计数据索引
 * @param {} data
 */
export function chartIndexes () {
  return request({
    url: '/chart-data/indexes',
    method: 'get'
  })
}
/**
 * 统计数据获取
 * @param {} data
 */
export function chartStatistics (params) {
  return request({
    url: '/chart-data/statistics',
    method: 'get',
    params
  })
}
/**
 * 面试题筛选条件获取
 * @param {} data
 */
export function questionFilters (id) {
  return request({
    url: `/questions/companyFilters/${id}`,
    method: 'get',
    token: 'token'
  })
}
/**
 * 获取面试题数据
 * @param {} data
 */
export function companyQuestion (params) {
  const { id, position, difficulty } = params
  return request({
    url: `/questions/company/${id}`,
    method: 'get',
    params: {
      position,
      difficulty
    },
    token: 'token'
  })
}
/**
 * 提交面试题
 * @param {} data
 */
export function submitQuestion (data) {
  return request({
    url: '/questions/submit',
    method: 'post',
    data,
    token: 'token'
  })
}
/**
 * 面试题详情
 * @param {} data
 */
export function questionDetail (id) {
  return request({
    url: `/questions/${id}`,
    method: 'get',
    token: 'token'
  })
}
/**
 * 收藏面试题
 * @param {} data
 */
export function collectQuestion (data) {
  return request({
    url: '/questions/collect',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 模拟面试筛选条件
 * @param {} data
 */
export function interFilters () {
  return request({
    url: '/interview/filters',
    token: 'token',
    method: 'get'
  })
}
/**
 * 获取模拟面试面试题数据
 * @param {} data
 */
export function interviewQuestions (params) {
  return request({
    url: '/interview/questions',
    method: 'get',
    token: 'token',
    params
  })
}
/**
 * 系统消息
 * @param {} data
 */
export function systemMessage () {
  return request({
    url: '/system-messages',
    method: 'get',
    token: 'token'
  })
}

