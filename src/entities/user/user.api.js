export const user = {
  signIn: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/auth/signin`,
    method: 'POST',
  }),
  refresh: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/auth/refresh`,
    method: 'POST',
  }),
  signOut: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/auth/signout`,
    method: 'GET',
  }),
};
