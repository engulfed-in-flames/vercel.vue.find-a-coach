import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';
import { authRedirect } from '../utils/auth';

// NOT Recommended to use `defineAsyncComponent` for routing. Instead...
const Coaches = () => import('../views/coaches/Coaches.vue');
const CoachCreate = () => import('../views/coaches/CoachCreate.vue');
const CoachDetails = () => import('../views/coaches/CoachDetails.vue');
const CoachContact = () => import('../views/coaches/CoachContact.vue');
const Requests = () => import('../views/requests/Request.vue');
const UserAuth = () => import('../views/auth/UserAuth.vue');
const NotFound = () => import('../views/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      name: 'coaches',
      component: Coaches,
    },
    {
      path: '/coaches/:coachId',
      name: 'coach-details',
      component: CoachDetails,
      props: true,
      children: [
        { path: 'contact', name: 'coach-contact', component: CoachContact },
      ],
    },
    {
      path: '/create',
      name: 'coach-create',
      component: CoachCreate,
      meta: { requireAuth: true },
    },
    {
      path: '/requests',
      name: 'requests',
      component: Requests,
      meta: { requireAuth: true },
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      meta: { requireNoAuth: true },
    },
    { path: '/:notFound(.*)', name: 'notFound', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  const store = useStore();
  const { requireAuth, requireNoAuth } = to.meta;
  const { isAuthenticated } = store.getters;

  const newRoute = authRedirect(
    { requireAuth, requireNoAuth },
    isAuthenticated
  );

  newRoute ? next(newRoute) : next();
});

export default router;
