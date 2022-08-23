import {PAYSTACK_SECRET} from '../config';
import {post} from './requests';
import crypto from 'crypto';

import {NextFunction, Request, Response} from 'express';
import trialModel from '../models/trial.model';
import userModel from '../models/user.model';
import UserService from '../services/user.services';
import subModel from '../models/subscription.model';
import PlanService from '../services/plan.services';
import NotifService from '../services/notification.service';

export type Interval = 'monthly' | 'yearly' | 'daily';

export class Paystack {
  async handleSubCancel(data: any) {
    const uService = new UserService();
    const pService = new PlanService();
    const nService = new NotifService();
    const user = await uService.findUserByEmail(data.customer.email);
    const plan = await pService.findPlanByName(data.plan.name);
    const sub = await subModel.findOne({owner: user._id});
    sub.status = 'non-renewing';
    await sub.save();
    await nService.createNotification(
      user,
      'Sub Cancelled',
      'You have cancelled your subscribtion and it wont renew',
    );
  }
  async handleSubSuccess(data: any) {
    const uService = new UserService();
    const pService = new PlanService();
    const nService = new NotifService();
    const user = await uService.findUserByEmail(data.customer.email);
    const plan = await pService.findPlanByName(data.plan.name);
    const trial = await trialModel.findOne({user: user._id});
    trial.status = 'Ended';
    await trial.save();
    const subData = {
      status: 'active',
      users: [user._id],
      owner: user._id,
      paystack_ref: data.subscription_code,
      ps_email_token: data.email_token,
      next_date: data.next_payment_date,
      plan: plan._id,
    };
    const sub = await subModel.findOne({owner: user._id});
    if (sub) {
      await sub.update(subData);
      await nService.createNotification(
        user,
        'Sub Created',
        'You have subscribed to plan' + plan.name,
      );
      return;
    }
    await subModel.create({...subData});
    await nService.createNotification(
      user,
      'Sub Created',
      'You have subscribed to plan' + plan.name,
    );
  }
  public handleChargeSuccess = async (data: any) => {
    if (!data.metadata.evt) {
      return;
    }
    await this.refund(data.reference);
    const uService = new UserService();
    const user = await uService.findUserByEmail(data.customer.email);
    const trial = await trialModel.findOne({user: user._id});
    if (!trial) {
      await trialModel.create({user: user._id});
    }
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

  public cancel = async (code: string, token: string) => {
    const params = JSON.stringify({
      code,
      token,
    });

    const url = 'https://api.paystack.co/subscription/disable',
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };

    const res = await post(url, headers, params);
    if (res && res.status == true) {
      return true;
    }

    return false;
  };
  public subscribe = async (
    customer: string,
    plan: string,
  ) => {
    const params = JSON.stringify({
      customer,
      plan,
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
    phone: string,
  ) => {
    const params = JSON.stringify({
      email,
      first_name,
      last_name,
      phone,
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
  refund = async (transaction: string) => {
      const params = JSON.stringify({
        transaction
      });
    const url = `https://api.paystack.co/refund`,
      headers = {
        Authorization: ['Bearer', this.secret].join(' '),
        'Content-Type': 'application/json',
      };
    const res = await post(url, headers,params);
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
        case 'subscription.not_renew':
          ps.handleSubCancel(data.data);
          break;
        default:
          break;
      }
      return;
    }
    res.send(404);
  };
}
