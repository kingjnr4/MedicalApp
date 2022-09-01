import {NextFunction, Request, Response} from 'express';
import { DeleteNotifDto } from '../dtos/admin.dto';
import { CreateFaqDto, DeleteFaqDto, UpdateFaqDto } from '../dtos/faq.dto';
import FaqService from '../services/faq.service';
class FaqController {
  private service = new FaqService();
  public add = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateFaqDto = req.body;
    const created = await this.service.create(data);
    if (created) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed'});
  };
  public update = async (req: Request, res: Response, next: NextFunction) => {
    const data: UpdateFaqDto = req.body;
    const created = await this.service.update(data);
    if (created) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'id not found'});
  };
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const data: DeleteFaqDto = req.body;
    const created = await this.service.delete(data);
    if (created) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'id not found'});
  };
  public get = async (req: Request, res: Response, next: NextFunction) => {
    const data: DeleteFaqDto = req.body;
    const all = await this.service.get();
    return res.send(all);
  };
}

export default FaqController