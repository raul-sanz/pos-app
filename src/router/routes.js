

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {path:'',redirect:'/home'},
      { path: 'home', component: () => import('pages/Index.vue'), meta: { requiresAuth: true}   },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'products', component: () => import('pages/Products.vue'), meta: { requiresAuth: true} },
      { path: 'users', component: () => import('pages/Users.vue'), meta: { requiresAuth: true} },
      { path: 'orders', component: () => import('pages/Order.vue'), meta: { requiresAuth: true} },
      { path: 'reports', component: () => import('pages/Reports.vue'), meta: { requiresAuth: true} },
      { path: 'register', component: () => import('pages/Register.vue')},
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
