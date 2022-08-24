import { NextFunction, Request, Response } from "express";
import StatsService from "../services/stats.service";
import TransactionService from "../services/transaction.service";

class StatController {
  private service = new StatsService();
  private tService = new TransactionService()
  public getUsersCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.service.getUserlen();
      return res.send(len.toString());
    } catch (e) {
      next(e);
    }
  };
  public getActiveSubsCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const len = await this.service.getActiveSubLen();
      return res.send(len.toString());
    } catch (e) {
      next(e);
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
      const len = await this.service.getAllUsers()
      return res.send(len);
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
  public getTransactionCount = async (req: Request,
    res: Response,
    next: NextFunction,) => {
    try {
      const len = await this.tService.getTransactionCount()
      return res.send(len)
    } catch (e) {
      return res.status(401).send(e)
    }
  }
}

export default StatController