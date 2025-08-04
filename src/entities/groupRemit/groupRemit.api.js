export const groupRemit = {
  joinGroupRemit: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/remittance/group`,
    method: 'POST',
  }),
  getGroupCommission: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/remittance/group/commission`,
    method: 'GET',
  }),
  getMemberCount: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/remittance/group/count`,
    method: 'POST',
  }),
};
