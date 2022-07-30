import {PAYSTACK_SECRET} from '../config';
import {post} from './requests';
import crypto from 'crypto';

import {NextFunction, Request, Response} from 'express';

export type Interval = 'monthly' | 'yearly' | 'daily';

export class Paystack {
  private secret: string;
  constructor(key?: string) {
    this.secret = key || PAYSTACK_SECRET;
  }

  public initSub = async (email: string, plan: string, metadata:string) => {
    const params = JSON.stringify({
      email,
      plan,
      metadata,
    });
  };

  public createPaystackPlan = async (
    name: string,
    amount: number,
    description: string,
    interval: Interval = 'monthly',
  ) => {
    const params = JSON.stringify({
      name,
      interval,
      amount,
      description,
    });

    const url = 'api.paystack.co/plan',
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };

    const res = await post(url, headers, params);
    if (res.status == true) {
      return true;
    }
    return false;
  };

  public initialize = async (email: string, metadata: string) => {
    const params = JSON.stringify({
      email,
      metadata,
      channels: ['card'],
      amount: 5000,
    });
    const url = 'https://api.paystack.co/transaction/initialize',
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };
    const res = await post(url, headers, params);
    if (res.status == true) {
      return res.data;
    }
    return null;
  };

  verify = async (reference: string) => {
    const url = `https://api.paystack.co/transaction/verify/${reference}`,
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };
    const res = await post(url, headers);
    return res;
  };
  public createCustomer = async (
    email: string,
    first_name: string,
    last_name: string,
  ) => {
    const params = JSON.stringify({
      email,
      first_name,
      last_name,
    });
    const url = 'https://api.paystack.co/customer',
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };
    const res = await post(url, headers, params);
    if (res.status == true) {
      return true;
    }
    return false;
  };
  refund = async (ref: string) => {
    const url = `https://api.paystack.co/refund`,
      method = 'POST',
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };
    const res = await post(url, headers);
    if (res.status == 'true') {
      return true;
    }
    return false;
  };

  static webhook = (req: Request, res: Response, next: NextFunction) => {
    const ps = new Paystack();
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
      res.send(200);
      // Retrieve the request's body
      const data = req.body;
      console.log(data);
      switch (data.event) {
        case 'charge.success':
          break;

        default:
          break;
      }
      return;
    }
    res.send(404);
  };
}
