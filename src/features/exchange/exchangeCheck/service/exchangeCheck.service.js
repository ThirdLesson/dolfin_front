import { exchange } from '@/entities/exchange/exchange.api';
import { apiFetch } from '@/shared/utils/client';

export async function exchangeCheck({ amount, targetCurrency, type }) {
  const { url, method } = exchange.check();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify({
      amount,
      targetCurrency,
      type,
    }),
  });

  const res = await response.json();
  return res;
}

export async function getExchangeGraph(currency) {
  const { url, method } = exchange.graph();
  const queryUrl = `${url}?targetExchange=${currency}`;
  const response = await apiFetch(queryUrl, {
    method,
  });

  const res = await response.json();
  return res;
}

export async function exchangeCalculate({ amount, targetCurrency }) {
  const { url, method } = exchange.calculate();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify({
      amount,
      targetCurrency,
    }),
  });

  const res = await response.json();
  return res;
}
