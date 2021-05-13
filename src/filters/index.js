import Vue from 'vue'
import moment from 'moment'

const genderMap = {
  0: '未知',
  1: '男',
  2: '女'
}
// 性别处理
Vue.filter('formatGender', v => genderMap[v])

// 日期处理
Vue.filter('formatTime', v => moment(v).format('YYYY.MM.DD'))
