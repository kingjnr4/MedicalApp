import https from 'https';
import paystack from 'paystack';
import { PAYSTACK_SECRET } from '../config';
import { axiosFetch } from './axios';

import { NextFunction, Request, Response } from "express";

type Interval = 'monthly' | 'yearly' | 'daily';
const api = paystack(PAYSTACK_SECRET!);


export class Paystack {
  // createPaystackPlan = async (
  //   name: string,
  //   amount: number,
  //   interval: Interval = 'monthly',
  // ) => {
  //   const plan = await api.plan.create({
  //     name,
  //     amount,
  //     interval,
  //   });
  //   return plan;
  // };
   createPaystackPlan = async (
    name: string,
    amount: number,
    description:string,
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
        Authorization: ['Bearer'].join(''),
        'Content-Type': 'application/json',
      };

    const data = await axiosFetch(url, method, headers, params);
    return data;
  };

 public  subscribe = async (
    email: string,
    amount: number,
    plan: string,
    callback_url: string,
  ) => {
    const params = JSON.stringify({
      email,
      amount,
      plan,
      callback_url,
    });
    const url = 'api.paystack.co/transaction/initialize',
      method = 'POST',
      headers = {
        Authorization: ['Bearer'].join(''),
        'Content-Type': 'application/json',
      };
    const data = await axiosFetch(url, method, headers, params);
    return data;
  };
  static webhook = (req: Request, res: Response, next: NextFunction)=>{

  }
}
