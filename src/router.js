import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'search',
    component: () => import('./view/search'),
    meta: {
      title: '发现'
    }
  },
  {
    name: 'order',
    component: () => import('./view/order'),
    meta: {
      title: '订单'
    }
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  },
  
  {
    name: 'login',
    component: () => import('./view/login'),

    meta: {
      title: '会员登录',
      TabbarShow: true ,// 不需要显示 底部导航
    }
  },
  
  {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
