export const transaction = {
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
  charge: (walletId) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/wallet/${walletId}`,
    method: 'POST',
  }),
  getLinkedAccounts: (walletId) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/account/${walletId}`,
    method: 'GET',
  }),
};
