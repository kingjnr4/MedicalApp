
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
  public async createPlan(
    name: string,
    amount: number,
    description: string,
    interval: Interval = 'monthly',
  ) {
    const codes = {
      paystack: '',
      flutterwave: '',
    };
    codes.paystack = await this.paystack.createPaystackPlan(
      name,
      amount *100,
      description,
      interval,
    );
    
    
    return codes;
  }
  /**
   * createCustomer
   */
  public async createCustomer(
    email: string,
    firstname: string,
    lastname: string,
    number:string,
  ) {
    return this.paystack.createCustomer(email, firstname, lastname,number);
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
   * Subscribe
   */
  public  async subscribe(plan: any, email: string, start_date: string) {
    switch (this.current) {
      case 'paystack':
        return this.paystack.subscribe(email, plan, start_date);
      default:
        break;
    }
  }
}
