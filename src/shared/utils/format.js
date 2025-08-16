export function formatDate(date, delimiter = '.') {
  if (!date) return '';

  const str = String(date).replace(/\D/g, ''); 
  if (str.length !== 8) return date; 

  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);

  return [year, month, day].join(delimiter);
}

export function formatAccountNumber(accountNumber) {
  if (!accountNumber || accountNumber === '0') return '-';
  return accountNumber.replace(/(\d{3})(\d{2,3})(\d{4})/, '$1-$2-$3');
}

export function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/-/g, ''); 
}

export function formatNumber(value, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits }).format(value ?? 0);
}