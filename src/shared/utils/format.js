export function formatDate(date, delimiter = '.') {
  if (!date) return '';

  const str = String(date).replace(/\D/g, ''); // 숫자 외 문자 제거
  if (str.length !== 8) return date; // 유효한 YYYYMMDD가 아니면 그대로 반환

  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);

  return [year, month, day].join(delimiter);
}

export function formatAccountNumber(accountNumber) {
  // 간단한 하이픈 포맷터 예시 (원하는 방식대로 조정 가능)
  if (!accountNumber || accountNumber === '0') return '-';
  return accountNumber.replace(/(\d{3})(\d{2,3})(\d{4})/, '$1-$2-$3');
}

export function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/-/g, ''); // '-' 제거
}
