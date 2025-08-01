export const exchange = {
  // 환율 조회 페이지
  check: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/check`,
    method: 'POST',
  }),
  graph: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/graph`,
    method: 'GET',
  }),
  calculate: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/exchange/calculate`,
    method: 'POST',
  }),
};
