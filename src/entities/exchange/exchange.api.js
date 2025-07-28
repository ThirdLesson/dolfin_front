export const exchange = {
  check: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/check`,
    method: 'POST',
  }),
  calculate: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/calculate`,
    method: 'POST',
  }),
};
