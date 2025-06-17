export const APP_ROUTES = {
  // * PUBLIC ROUTES
  home: {
    root: '/home',
  },
  products: {
    root: '/products',
    moto: '/products/moto',
    accesorio: '/products/accesorio',
    repuesto: '/products/repuesto',
    detail: (productId: string) => `/products/${productId}`,
  },
  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
};
