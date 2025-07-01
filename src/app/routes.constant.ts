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
      checkout: {
        root: '/client/cart/checkout',
        shipping: '/client/cart/checkout/shipping',
        payment: '/client/cart/checkout/payment',
        confirmation: '/client/cart/checkout/confirmation',
      },
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
