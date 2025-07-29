export const map = {
  banks: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/location/banks`,
    method: 'GET',
  }),
  centers: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/location/centers`,
    method: 'GET',
  }),
};
