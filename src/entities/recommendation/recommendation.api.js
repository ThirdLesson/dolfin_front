export const recommendation = {
  depositsFilter: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/deposits/recommend`,
    method: 'GET',
  }),
  depositsInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/deposits`,
    method: 'GET',
  }),
  savingsFilter: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/savings/recommend`,
    method: 'GET',
  }),
  savingsInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/deposit-savings/savings`,
    method: 'GET',
  }),
  personalLoanFilter: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/personal-loans/recommend`,
    method: 'GET',
  }),
  personalLoanInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/personal-loans`,
    method: 'GET',
  }),
  jeonseLoanFilter: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/jeonse-loan/recommend`,
    method: 'GET',
  }),
  jeonseLoanInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/jeonse-loan`,
    method: 'GET',
  }),
};
