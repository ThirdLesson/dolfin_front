export const user = {
  // 로그인 페이지
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

  // 회원가입 페이지
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

  // 계좌 등록 페이지
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

  // 전자 지갑 조회
  getWalletInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/wallet`,
    method: 'GET',
  }),

  // 나의 계좌 목록 조회
  getMyAccounts: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/account`,
    method: 'GET',
  }),
};
