import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import { useUserStore } from '@/stores/user';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        title: "login",
        guest: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {
        title: "register",
        guest: true,
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: {
        title: "dashboard",
        auth: true,
        admin: true,
      }
    },
    {
      path: '/dashboard-client',
      name: 'dashboard.client',
      component: () => import('../views/DashboardClientView.vue'),
      meta: {
        title: "dashboard client",
        auth: true,
      }
    },
    {
      path: '/client/:id',
      name: 'client.ship',
      component: () => import('../views/ShipClientView.vue'),
      meta: {
        title: "dashboard ship",
        auth: true,
      }
    },
    {
      path: '/ship/:id',
      name: 'ship.show',
      component: () => import('../views/admin/ShipView.vue'),
      meta: {
        title: "navire",
        auth: true,
        admin: true,
      }
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/admin/ProfileView.vue'),
      meta: {
        title: "profile",
        auth: true,
        admin: true,
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/admin/UserView.vue'),
      meta: {
        title: "user",
        auth: true,
        admin: true,
      }
    },
    {
      path: '/bls',
      name: 'bls',
      component: () => import('../views/admin/BlView.vue'),
      meta: {
        title: "liste des bl",
        auth: true,
        admin: true,
      }
    },
    {
      path: '/bl-client',
      name: 'bl.client',
      component: () => import('../views/BlClientView.vue'),
      meta: {
        title: "liste des bl",
        auth: true,
      }
    },
    {
      path: '/rapport-client',
      name: 'rapport.client',
      component: () => import('../views/RapportClientView.vue'),
      meta: {
        title: "rapport des dechargement",
        auth: true,
      }
    },
    {
      path: '/bls/ship/:id',
      name: 'bls.ship',
      component: () => import('../views/BlShipView.vue'),
      meta: {
        title: "navire",
        auth: true,
      }
    },
    {
      path: '/holds/ship/:id',
      name: 'holds.ship',
      component: () => import('../views/HoldShipView.vue'),
      meta: {
        title: "navire",
        auth: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})
router.beforeEach((to, from, next) => {
  const user = useUserStore();

  // Vérifier si la route nécessite une authentification
  if (to.meta.auth && !user.logged) {
    next({ name: 'login' }); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  }
  else if (to.meta.admin && user.getUser?.role !== 'admin') {
    next({ name: 'dashboard.client' }); // Rediriger vers le tableau de bord client si l'utilisateur n'est pas admin
  }
  else if (to.meta.guest && user.logged) {
    if (user.getUser?.role === 'admin') {
      next({ name: 'dashboard' }); // Rediriger l'admin vers son tableau de bord
    } else {
      next({ name: 'dashboard.client' }); // Rediriger l'utilisateur vers le tableau de bord client
    }
  }
  else {
    next(); // Continuer normalement si aucune condition n'est remplie
  }
});
// router.beforeEach((to, from, next) => {
//   const user = useUserStore();
//   if (to.meta.guest && user.logged && user.getUser?.role == 'admin') {
//     next({ name: 'dashboard' });
//   } else if (to.meta.guest && user.logged && user.getUser?.role == 'user') {
//     next({ name: 'dashboard.client' });
//   } else {
//     next();
//   }
// })
// router.beforeEach((to, from, next) => {
//   const user = useUserStore();
//   if (to.meta.auth && !user.logged) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// })
// router.beforeEach((to, from, next) => {
//   const user = useUserStore();
//   if (to.meta.admin && user.getUser.role == 'user') {
//     next({ name: 'dashboard.client' });
//   } else {
//     next();
//   }
// })
export default router
