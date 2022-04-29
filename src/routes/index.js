import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/board',
      component: () => import('@/views/BoardListPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/board/:boardName',
      component: () => import('@/views/BoardPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/board/:boardName/post',
      component: () => import('@/views/PostAddPage2.vue'),
      meta: { auth: true },
    },
    {
      path: '/board/:boardName/post/:postId',
      component: () => import('@/views/PostPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/board/:boardName/post/:postId/modify',
      name: 'postModify',
      component: () => import('@/views/PostEditPage2.vue'),
      meta: { auth: true },
    },
    {
      path: '/encyclopedia',
      component: () => import('@/views/EncyclopediaPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/encyclopedia/view/:pokeId',
      component: () => import('@/views/PokeDetailPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfilePage.vue'),
      meta: { auth: true },
    },
    {
      path: '/profile/passwordChange',
      component: () => import('@/views/PasswordChangePage.vue'),
      meta: { auth: true },
    },
    {
      path: '/chat',
      component: () => import('@/views/ChatPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/chat/room',
      //https://any-ting.tistory.com/46
      name: 'ChatRoom',
      component: () => import('@/views/ChatDetailPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/notifications',
      component: () => import('@/views/NotificationsPage.vue'),
      meta: { auth: true },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  }
  next();
});

router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/signup') {
    if (store.getters.isLogin) {
      console.log(to.path);
      console.log(to.meta.auth);
      alert('로그인 상태에서 접근할 수 없습니다.');
      next('/main');
      return;
    }
  }
  next();
});

export default router;
