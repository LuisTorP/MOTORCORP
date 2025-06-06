export const APP_ROUTES = {
  // * PUBLIC ROUTES

  motos: {
    root: '/motos',
    detail: (motoId: string) => `/motos/${motoId}`,
  },
};
