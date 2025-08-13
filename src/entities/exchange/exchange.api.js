export const exchange = {
  check: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/check`,
    method: 'POST',
  }),
  graph: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/graph`,
    method: 'GET',
  }),
  live: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/live`,
    method: 'GET',
  }),
};
