export const transaction = {
  getRecentTels: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/transfer/recent/wallet`,
    method: 'GET',
  }),
  getRecentAccounts: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/transfer/recent/account`,
    method: 'GET',
  }),
  transferByTel: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/transfer/phone-num`,
    method: 'POST',
  }),
  transferByAccount: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/transfer/account`,
    method: 'POST',
  }),
  checkTelName: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/transfer/phone-num`,
    method: 'GET',
  }),
  checkAccountName: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/transfer/account`,
    method: 'GET',
  }),
  charge: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/wallet`,
    method: 'POST',
  }),
  history: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/transaction`,
    method: 'GET',
  }),
};
