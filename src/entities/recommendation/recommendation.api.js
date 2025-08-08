export const recommendation = {
  depositsFilter: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/deposits/recommend`,
    method: 'GET',
  }),
  depositsInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/deposits`,
    method: 'GET',
  }),
};
