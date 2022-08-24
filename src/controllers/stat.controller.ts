import { NextFunction,Request,Response} from "express";
import StatsService from "../services/stats.service";

class StatController {
  private service = new StatsService();
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
}

export default StatController