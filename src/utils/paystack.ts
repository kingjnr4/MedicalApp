import https from 'https';
import { axiosFetch } from './axios';
type Interval = 'monthly' | 'yearly' | 'daily';
export const createPaystackPlan = async (
  name: string,
  amount: number,
  interval: Interval = 'monthly',
) => {
  const params = JSON.stringify({
    name,
    interval,
    amount,
  });

  const url = 'api.paystack.co/plan',
    method = 'POST',
    headers = {
      Authorization: 'Bearer SECRET_KEY',
      'Content-Type': 'application/json',
    };

  const data = await axiosFetch(url, method, headers, params);
};
