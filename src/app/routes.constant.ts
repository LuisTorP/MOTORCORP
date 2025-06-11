export const APP_ROUTES = {
  // * PUBLIC ROUTES

  products: {
    root: '/products',
    moto: '/products/moto',
    accesorio: '/products/accesorio',
    repuesto: '/products/repuesto',
    detail: (productId: string) => `/products/${productId}`,
  },
};
