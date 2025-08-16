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

  checkId: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/auth/check-id`,
    method: 'POST',
  }),
  sendCode: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/auth/send-code`,
    method: 'POST',
  }),
  verifyCode: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/auth/verify-code`,
    method: 'POST',
  }),
  signUp: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/auth/join`,
    method: 'POST',
  }),

  addAccount: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/codef/account`,
    method: 'POST',
  }),
  verifyCode: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/codef/account/verify`,
    method: 'POST',
  }),
  setWalletPw: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/codef/account/wallet`,
    method: 'POST',
  }),

  getWalletInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/wallet`,
    method: 'GET',
  }),

  getMyAccounts: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/account`,
    method: 'GET',
  }),
};
