export const recommendation = {
  deposits: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/sync/deposits`,
    method: 'POST',
  }),
  depositsFilter: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/deposits/recommend`,
    method: 'GET',
  }),
  depositsInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/deposits`,
    method: 'GET',
  }),
};
