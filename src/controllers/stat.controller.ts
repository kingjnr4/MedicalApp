import { NextFunction,Request,Response} from "express";
import StatsService from "../services/stats.service";

class StatController {
    private service = new  StatsService()
  public getUsersCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
        const len = await this.service.getUserlen()
        return res.send(len)
    } catch (e) {
        next(e)
    }
  };
}

export default StatController