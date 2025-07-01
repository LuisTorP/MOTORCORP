export const APP_ROUTES = {
  // * PUBLIC ROUTES
  client: {
    home: {
      root: '/home',
    },
    products: {
      root: '/client/products',
      moto: '/client/products/moto',
      accesorio: '/client/products/accesorio',
      repuesto: '/client/products/repuesto',
      detail: (productId: string) => `/client/products/${productId}`,
    },
    about: {
      root: '/client/about',
    },
    auth: {
      root: '/client/auth',
      login: '/client/auth/login',
      register: '/client/auth/register',
    },
    cart: {
      root: '/client/cart',
      cart: '/client/cart',
      checkout: '/client/cart/checkout',
    },
  },
  admin: {
    products: {
      root: '/admin/products',
      detail: (productId: string) => `/admin/products/${productId}`,
    },
    sales: {
      root: '/admin/sales',
    },
  },
};
