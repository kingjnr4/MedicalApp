import {Code} from '../interfaces/plans.interface';
import settingsModel from '../models/settings.model';
import {SettingsService} from '../services/settings.services';
import {Interval, Paystack} from './paystack';

export class Gateway {
  private key: string;
  private current: string;
  private service: SettingsService;
  private paystack: Paystack;
  private flutterwave: SettingsService;
  constructor() {
    this.service = new SettingsService();
  }

  /**
   * init
   */
  public async init() {
    this.current = await this.service.getCurrentPayGateWay();
    this.key = (await this.service.findKeyByName(this.current)).secret;
    switch (this.current) {
      case 'paystack':
        this.paystack = new Paystack(this.key);
        break;
      default:
        break;
    }
  }

  /**
   * create
   */
  public createPlan( name: string,
    amount: number,
    description: string,
    interval: Interval = 'monthly',) {
    switch (this.current) {
      case 'paystack':
        return this.paystack.createPaystackPlan(name,amount,description,interval);
      default:
        break;
  }}
  /**
   * createCustomer
   */
  public async createCustomer(
    email: string,
    firstname: string,
    lastname: string,
  ) {
    return this.paystack.createCustomer(email, firstname, lastname);
  }

  /**
   * initCard
   */
  public initCard(email: string) {
    switch (this.current) {
      case 'paystack':
        const metadata = JSON.stringify({
          evt: 'card_init',
          custom_filters: {
            recurring: true,
          },
        });
        return this.paystack.initialize(email, metadata);
      default:
        break;
    }
  }
  /**
   * refundCard
   */
  public refundCard(ref: string) {
    switch (this.current) {
      case 'paystack':
        return this.paystack.refund(ref);
      default:
        break;
    }
  }

  /**
   * charge
   */
}
