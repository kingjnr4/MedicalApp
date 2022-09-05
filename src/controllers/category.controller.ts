import {NextFunction, Request, Response} from 'express';
import {CreateCatDto} from '../dtos/category.dto';
import CategoryService from '../services/category.service';
class CategoryController {
  private service = new CategoryService();
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateCatDto = req.body;
    if (data.parent) {
      if (!(await this.service.exist(data.parent))) {
        return res.send({message: 'failed', reason: 'parent does not exist'});
      }
      if (await(this.service.exist(data.name))) {
        return res.send({message: 'failed', reason: 'name exist'});
      }
      const created = await this.service.createWithParent(data);
      if (created) {
        return res.send({message: 'success'});
      }
    } else {
           if (await(this.service.exist(data.name))) {
             return res.send({message: 'failed', reason: 'name exist'});
           }
      const created = await this.service.createWithoutParent(data.name);
      if (created) {
        return res.send({message: 'success'});
      }
    }
    return res.send({message: 'failed', reason: 'name exist'});
  };
public getAll = async (req: Request, res: Response, next: NextFunction) => {
    const all = await this.service.get();
     return res.send({all});
}
}
export default CategoryController;
