const FrontendRoutes = [
    {
        path     : '',
        name     : 'home',
        component: () => import('./pages/Home'),
        meta     : {
            title: 'Home'
        }
    },
    {
        path     : '/about',
        name     : 'about',
        component: () => import('./pages/About'),
        meta     : {
            title: 'About'
        }
    },  {
        path     : '/cart',
        name     : 'cartPage',
        component: () => import('./pages/Cart'),
        meta     : {
            title: 'Cart'
        }
    },
    //==========Authentication==========
    {
        path     : '/admin/login',
        name     : 'adminLogin',
        component: () => import('./../backend/auth/Login'),
        meta     : {
            title: 'Admin Login'
        }
    },
    {
        path     : '/login',
        name     : 'userLogin',
        component: () => import('./auth/Login'),
        meta     : {
            title: 'Login'
        }
    }, {
        path     : '/register',
        name     : 'register',
        component: () => import('./auth/Register'),
        meta     : {
            title: 'Register'
        }
    },

    //==========User Dashboard==========
    {
        path     : '/dashboard',
        name     : 'userDashboard',
        component: () => import('./user/Dashboard'),
        meta     : {
            title      : 'Dashboard',
            requireAuth: true,
        }
    },
];
export default FrontendRoutes;
