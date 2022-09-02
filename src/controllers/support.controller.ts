import {NextFunction, Request, Response} from 'express';
import {CreateSupportDto, ReplySupportDto} from '../dtos/support.dto';
import {IUser} from '../interfaces/user.interface';
import SupportService from '../services/support.service';
import UserService from '../services/user.services';
class SupportController {
  private service = new SupportService();
  private uService = new UserService();
  public add = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateSupportDto = req.body;
    const user: IUser = req['user'];
    const sent = await this.service.create(data, user.email);
    if (sent) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed'});
  };
  public reply = async (req: Request, res: Response, next: NextFunction) => {
    const data: ReplySupportDto = req.body;
    const updated = await this.service.updateReply(data.id, data.reply);
    if (updated) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'id not found'});
  };
  public open = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const updated = await this.service.updateOpened(data.id);
    if (updated == null) {
      return res.send({
        message: 'failed',
        reason: 'already replied to message',
      });
    }
    if (updated) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'id not found'});
  };
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    const all = await this.service.getAll();
    return res.send(all);
  };
  public getByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const user: IUser = req['user'];
    const all = await this.service.getAllFromUser(user.email);
    return res.send(all);
  };
  public getRepliesForUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const user: IUser = req['user'];
    const all = await this.service.getNewRepliesUser(user.email);
    return res.send(all);
  };
  public delete = async (req: Request, res: Response, next: NextFunction) => {};
}

export default SupportController;
