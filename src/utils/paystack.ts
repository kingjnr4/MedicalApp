import {PAYSTACK_SECRET} from '../config';
import {post} from './requests';
import crypto from 'crypto';

import {NextFunction, Request, Response} from 'express';
import trialModel from '../models/trial.model';
import userModel from '../models/user.model';
import UserService from '../services/user.services';
import subModel from '../models/subscription.model';
import PlanService from '../services/plan.services';

export type Interval = 'monthly' | 'yearly' | 'daily';

export class Paystack {
  async handleSubSuccess(data: any) {
    const uService = new UserService();
    const pService = new PlanService ()
    const user = await uService.findUserByEmail(data.customer.email);
    const plan = await pService.findPlanByName(data.plan.name);
    const subData = {
      status: 'active',
      users: [user._id],
      owner:user._id,
      paystackRef: data.subscription_code,
      next_date: data.next_payment_date,
      plan:plan._id,
    };
    await subModel.create({...subData});
  }
  public handleChargeSuccess = async (data: any) => {
    if (!data.metadata.evt){
      return
    }
    await this.refund(data.reference);
    const uService = new UserService();
    const user = await uService.findUserByEmail(data.customer.email);
    await trialModel.create({user: user._id});
  };
  public secret: string;
  constructor(key?: string) {
    this.secret = key || PAYSTACK_SECRET;
  }

  public initSub = async (email: string, plan: string, metadata: string) => {
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

    const url = 'https://api.paystack.co/plan',
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };

    const res = await post(url, headers, params);
    if (res.status == true) {
      return res.data.plan_code;
    }
    return null;
  };

  public subscribe = async (
    customer: string,
    plan: string,
    start_date: string,
  ) => {
    const params = JSON.stringify({
      customer,
      plan,
      start_date,
    });

    const url = 'https://api.paystack.co/subscription',
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };
    const res = await post(url, headers, params);
    if (res && res.status == true) {
      return true;
    }
    return null;
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
    if (res && res.status == 'true') {
      return true;
    }
    return false;
  };

  static webhook = (req: Request, res: Response, next: NextFunction) => {
    const ps = new Paystack();
    const secret = ps.secret || PAYSTACK_SECRET;
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
      res.send(200);
      // Retrieve the request's body
      const data = req.body;
      console.log(data);
      switch (data.event) {
        case 'charge.success':
          ps.handleChargeSuccess(data.data);
          break;
        case 'subscription.create':
          ps.handleSubSuccess(data.data);
          break;
        default:
          break;
      }
      return;
    }
    res.send(404);
  };
}
