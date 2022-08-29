import {NextFunction, Request, Response} from 'express';
import {SendMailDto, SendNotificationDto, SendSingleMailDto} from '../dtos/admin.dto';
import StatsService from '../services/stats.service';
import TransactionService from '../services/transaction.service';
import UserService from '../services/user.services';
import { getMailForAll, sendmail } from '../utils/mail';

class StatController {
  private service = new StatsService();
  private tService = new TransactionService();
  private uService = new UserService ()
  public getHomeStats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const ulen = await this.service.getUserlen();
      const aSublen = await this.service.getActiveSubLen();
      const eSublen = await this.service.getEndedSubLen();
      const cSublen = await this.service.getCancelledSubLen();
      const len = {
        active_sub: aSublen,
        ended_sub: eSublen,
        non_renewing_sub: cSublen,
        users: ulen,
      };
      return res.send(len);
    } catch (e) {
      next(e);
    }
  };
  public getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const transactions = await this.service.getAllTransactions();
      return res.send(transactions);
    } catch (e) {
      next(e);
    }
  };
  public sendInAppNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const data: SendNotificationDto = req.body;
    try {
      const len = await this.service.getAllUsers();
      if (len.length == 0) {
        return res.send({message: 'failed', reason: 'no users'});
      }
      const sent = this.service.sendNotification(data.title, data.message);
      if (sent) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (e) {
      next(e);
    }
  };
  public sendEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.service.getUserlen();
      if (len == 0) {
        return res.send({message: 'failed', reason: 'no users'});
      }
      const data: SendMailDto = req.body;
      this.service
        .sendBulkMail(data.subject, data.message)
        .then(msg => {
          return res
            .status(200)
            .send({message: 'success', reason: 'mails sent successfully'});
        })
        .catch(e => {
          return res
            .status(200)
            .send({message: 'failed', reason: 'mails not sent'});
        });
    } catch (error) {}
  };
  public sendSingleEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.service.getUserlen();
      if (len == 0) {
        return res.send({message: 'failed', reason: 'no users'});
      }
      const data: SendSingleMailDto = req.body;
      const user =  await this.uService.findUserByEmail (data.email)
      const mail = getMailForAll (user.email,data.subject,data.message)
     sendmail(mail)
        .then(msg => {
          return res
            .status(200)
            .send({message: 'success', reason: 'mails sent successfully'});
        })
        .catch(e => {
          return res
            .status(200)
            .send({message: 'failed', reason: 'mails not sent'});
        });
    } catch (e) {
      next (e)
    }
  };
  public getEndedSubsCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.service.getEndedSubLen();
      return res.send(len.toString());
    } catch (e) {
      next(e);
    }
  };
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.service.getAllUsers();
      return res.send(len);
    } catch (e) {
      next(e);
    }
  };
    public getAllSubs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const all = await this.service.getAllSubs();
      return res.send(all);
    } catch (e) {
      next(e);
    }
  };
  public getNonRenewingSubsCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.service.getCancelledSubLen();
      return res.send(len.toString());
    } catch (e) {
      next(e);
    }
  };
  public getNewUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const recent = await this.service.getRecentSix();
      return res.send(recent);
    } catch (e) {
      next(e);
    }
  };
  public getTransactionCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.tService.getTransactionCount();
      return res.send(len);
    } catch (e) {
      return res.status(401).send(e);
    }
  };
}

export default StatController;
