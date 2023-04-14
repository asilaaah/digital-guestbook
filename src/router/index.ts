import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'
import GalleryView from '../views/GalleryView.vue'

const guardRoute = (to: any, from: any, next: any) => {
  const isSignIn = useUserStore().getUserToken;
  if(isSignIn) {
    next();
  } else {
    next('/signin')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: GalleryView
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue'),
      beforeEnter: guardRoute
    }
  ]
})

export default router
