import {PAYSTACK_SECRET} from '../config';
import {axiosFetch} from './axios';
import crypto from 'crypto';

import {NextFunction, Request, Response} from 'express';

type Interval = 'monthly' | 'yearly' | 'daily';

export class Paystack {
  private secret: string;
  constructor(key?: string) {
    this.secret = key || PAYSTACK_SECRET;
  }

  createPaystackPlan = async (
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
      method = 'POST',
      headers = {
        Authorization: ['Bearer', this.secret].join(''),
        'Content-Type': 'application/json',
      };

    const res = await axiosFetch(url, method, headers, params);
    if (res.status == 'true') {
      return res;
    }
    return '';
  };

  public initialize = async (
    email: string,
    metadata: string,
  ) => {
    const params = JSON.stringify({
      email,
      metadata,
      channels: ['card'],
    });
    const url = 'https://api.paystack.co/transaction/initialize',
      method = 'POST',
      headers = {
        Authorization: ['Bearer', this.secret].join(''),
        'Content-Type': 'application/json',
      };
    const res = await axiosFetch(url, method, headers, params);
    return res;
  };

  verify = async (reference: string) => {
    const url = `https://api.paystack.co/transaction/verify/${reference}`,
      method = 'POST',
      headers = {
        Authorization: ['Bearer', this.secret].join(''),
        'Content-Type': 'application/json',
      };
    const res = await axiosFetch(url, method, headers);
    return res;
  };
  createCustomer = async (
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
      method = 'POST',
      headers = {
        Authorization: ['Bearer', this.secret].join(''),
        'Content-Type': 'application/json',
      };
    const res = await axiosFetch(url, method, headers, params);
    if (res.status == 'true') {
      return true;
    }
    return false;
  };
  refund = async (ref: string) => {
    const url = `https://api.paystack.co/refund`,
      method = 'POST',
      headers = {
        Authorization: ['Bearer', this.secret].join(''),
        'Content-Type': 'application/json',
      };
    const res = await axiosFetch(url, method, headers);
    if (res.status == 'true') {
      return true;
    }
    return false;
  };
  charge = async (
    email: string,
    amount: number,
    metadata: string,
    authorization_code: string,
  ) => {
    const params = JSON.stringify({
      email,
      amount,
      metadata,
      authorization_code,
    });
    const url = `https://api.paystack.co/transaction/charge_authorization`,
      method = 'POST',
      headers = {
        Authorization: ['Bearer', this.secret].join(''),
        'Content-Type': 'application/json',
      };
    let res = await axiosFetch(url, method, headers, params);
    if (res.status == true && res.data.status == 'pending') {
      const urlVer = `https://api.paystack.co/charge/${res.data.reference}`,
        methodVer = 'GET';
      return await axiosFetch(urlVer, methodVer, headers, params);
    }
    return res;
  };
  static webhook = (req: Request, res: Response, next: NextFunction) => {
    const ps = new Paystack()
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
        case "charge.success":
          
          break;
      
        default:
          break;
      }
      return;
    }
    res.send(404);
  };
}
