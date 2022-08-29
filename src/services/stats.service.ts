import subModel from '../models/subscription.model';
import userModel from '../models/user.model';
import NotifService from './notification.service';
import SubService from './subscription.services';
import TransactionService from './transaction.service';
import UserService from './user.services';
import {Document} from 'mongoose';
import {UserDoc} from '../interfaces/user.interface';
import {getMailForAll, sendmail} from '../utils/mail';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { uuid } from 'uuidv4';

class StatsService {
  public async getUserlen() {
    const users = await userModel.count();
    return users;
  }
  public async getActiveSubLen() {
    const subs = await subModel.count({status: 'active'});
    return subs;
  }
  public async getCancelledSubLen() {
    const subs = await subModel.count({status: 'non-renewing'});
    return subs;
  }
  public async getEndedSubLen() {
    const subs = await subModel.count({status: 'ended'});
    return subs;
  }
  public async getAllUsers() {
    const service = new SubService();
    const users = await userModel.find();
    let result = [];
    if (users != null) {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const sub = await service.getCurrentSub(user);
        result.push({
          username: user.username,
          email: user.email,
          status: user.status,
          subscription: sub ? sub.name : 'no sub ',
          joined: user.joined,
        });
      }
      return result;
    }
  }
  
  public async getAllSubs() {
    const subs = await subModel.find();
    let result = []
      if (subs != null) {
      for (let i = 0; i < subs.length; i++) {
         const sub = subs[i];
         const user = await userModel.findById(sub.owner)
          result.push({
            username: user.username,
            status: sub.status,
            expires: sub.next_date,
          });
      }}
      return result
  }
  public async sendNotification(title: string, message: string,) {
    const service = new NotifService();
    const users = await userModel.find();
    if (users != null) {
      const id = uuid()
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const sent = await service.createNotification(user, title, message,id,'general');
        if (sent == false) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  public async sendBulkMail(subject: string, message: string) {
    const emails = (await this.getAllUsers()).map(val => val.email as string);
    let promises = [];
    for (var i = 0; i < emails.length; i++) {
      promises.push(
        new Promise(function (resolve, reject) {
          const mail = getMailForAll(emails[i], subject, message);
           sendmail(mail)
            .then(res => resolve(res))
            .catch(err => reject(err));
        }),
      );
    }
    return  Promise.all(promises);
  }
  public async getAllTransactions() {
    const service = new TransactionService();
    const all = service.getAll();
    return all;
  }
  public async getRecentSix() {
    const users = await userModel.find().sort('-joined').limit(6);
    return users;
  }
}
export default StatsService;
