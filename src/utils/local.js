// 保存token
export function setLocal (key = 'heimamm_mobile_token', value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// 获取token
export function getLocal (key = 'heimamm_mobile_token') {
  return JSON.parse(localStorage.getItem(key))
}

// 移除token
export function removeLocal (key = 'heimamm_mobile_token') {
  localStorage.removeItem(key)
}

