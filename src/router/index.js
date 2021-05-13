import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/find'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    },
    {
      path: '/company',
      name: 'Company',
      component: () => import('@/views/company'),
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/question',
      name: 'Question',
      component: () => import('@/views/question'),
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/find',
      name: 'Find',
      component: () => import('@/views/find'),
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/company-detail/:id',
      component: () => import('@/views/company-detail')
    },
    {
      path: '/company-position/:id',
      component: () => import('@/views/company-position')
    },
    {
      path: '/position-detail/:id',
      component: () => import('@/views/position-detail')
    },
    {
      path: '/find/experience-add',
      name: 'ExperienceAdd',
      component: () => import('@/views/find/experience-add')
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('@/views/my'),
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/my/message',
      name: 'Message',
      component: () => import('@/views/my/message')
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: () => import('@/views/user-info')
    },
    {
      path: '/edit-info',
      name: 'EditInfo',
      component: () => import('@/views/edit-info')
    },
    {
      path: '/chart',
      name: 'Chart',
      component: () => import('@/views/chart')
    },
    {
      path: '/technic-list',
      name: 'TechnicList',
      component: () => import('@/views/technic-list')
    },
    {
      path: '/technic-detail/:id',
      component: () => import('@/views/technic-detail')
    },
    {
      path: '/share-list',
      name: 'ShareList',
      component: () => import('@/views/share-list')
    },
    {
      path: '/share-detail/:id',
      component: () => import('@/views/share-detail')
    },
    {
      path: '/search/:tag',
      component: () => import('@/views/search')
    },
    {
      path: '/interview',
      name: 'Interview',
      component: () => import('@/views/interview')
    }
  ]
})

// 处理路由异常，重写路由的push方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error)
}

// 跳转到登录页逻辑
VueRouter.prototype.toLogin = function (fromPath) {
  if (fromPath) {
    return this.push(`/login?_redirect=${fromPath}`)
  } else {
    this.push(`/login?_redirect=${this.currentRoute.fullPath}`)
  }
}
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 如果token存在，尝试获取一下用户信息
  // 添加window的滚动获取
  from.meta.scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0
  next()
})

// 路由后置守卫
router.afterEach((to, from) => {
  // 如果发现路由meta中有该路由的信息就跳到相应的位置
  if (to.query.isScroll) {
    setTimeout(() => {
      window.scrollTo(0, to.meta.scrollTop || 0)
    }, 0)
  } else {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }
})

export default router