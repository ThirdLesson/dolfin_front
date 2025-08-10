import { apiFetch } from '@/shared/utils/client';
import { recommendation } from '@/entities/recommendation/recommendation.api';

export async function getDepositsFilter({
  productPeriod,
  page,
  pageSize = 20,
  spclConditions,
}) {
  const { url, method } = recommendation.depositsFilter();

  const params = new URLSearchParams({
    productPeriod,
    page,
    pageSize,
  });

  spclConditions?.forEach((cond) => params.append('spclConditions', cond));

  const queryUrl = `${url}?${params.toString()}`;
  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}

export async function getDepositInfo(depositId) {
  const { url, method } = recommendation.depositsInfo();
  const queryUrl = `${url}/${depositId}`;

  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}

export async function getSavingsFilter({
  productPeriod,
  page,
  pageSize = 20,
  spclConditions,
}) {
  const { url, method } = recommendation.savingsFilter();

  const params = new URLSearchParams({
    productPeriod,
    page,
    pageSize,
  });

  spclConditions?.forEach((cond) => params.append('spclConditions', cond));

  const queryUrl = `${url}?${params.toString()}`;
  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}

export async function getSavingInfo(savingId) {
  const { url, method } = recommendation.savingsInfo();
  const queryUrl = `${url}/${savingId}`;

  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}

export async function getPersonalLoanFilter({
  page,
  pageSize = 20,
  filterType,
  minAmount,
  maxAmount,
}) {
  const { url, method } = recommendation.personalLoanFilter();

  const params = new URLSearchParams({
    page,
    pageSize,
    filterType,
    minAmount,
    maxAmount,
  });

  const queryUrl = `${url}?${params.toString()}`;
  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}

export async function getPersonalLoanInfo(personalLoanId) {
  const { url, method } = recommendation.personalLoanInfo();
  const queryUrl = `${url}/${personalLoanId}`;

  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}

export async function getJeonseLoanFilter({ page, pageSize = 20, filterType }) {
  const { url, method } = recommendation.jeonseLoanFilter();

  const params = new URLSearchParams({
    page,
    pageSize,
    filterType,
    minAmount,
    maxAmount,
  });

  const queryUrl = `${url}?${params.toString()}`;
  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}
