import {NextFunction, Request, Response} from 'express';
import {CreateCatDto} from '../dtos/category.dto';
import CategoryService from '../services/category.service';
class CategoryController {
  private service = new CategoryService();
  public createClinical = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const data: CreateCatDto = req.body;
    if (data.parent) {
      if (!(await this.service.existClinical(data.parent))) {
        return res.send({message: 'failed', reason: 'parent does not exist'});
      }
      if (await this.service.existClinical(data.name)) {
        return res.send({message: 'failed', reason: 'name exist'});
      }
      const created = await this.service.createWithParentClinical(data);
      if (created) {
        return res.send({message: 'success'});
      }
    } else {
      if (await this.service.existClinical(data.name)) {
        return res.send({message: 'failed', reason: 'name exist'});
      }
      const created = await this.service.createWithoutParentClinical(data.name);
      if (created) {
        return res.send({message: 'success'});
      }
    }
    return res.send({message: 'failed', reason: 'name exist'});
  };
  public createAntibiotic = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const data: CreateCatDto = req.body;
    if (data.parent) {
      if (!(await this.service.existAntibiotic(data.parent))) {
        return res.send({message: 'failed', reason: 'parent does not exist'});
      }
      if (await this.service.existAntibiotic(data.name)) {
        return res.send({message: 'failed', reason: 'name exist'});
      }
      const created = await this.service.createWithParentAntibiotic(data);
      if (created) {
        return res.send({message: 'success'});
      }
    } else {
      if (await this.service.existAntibiotic(data.name)) {
        return res.send({message: 'failed', reason: 'name exist'});
      }
      const created = await this.service.createWithoutParentAntibiotic(
        data.name,
      );
      if (created) {
        return res.send({message: 'success'});
      }
    }
    return res.send({message: 'failed', reason: 'name exist'});
  };
  public getAllClinical = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const all = await this.service.getClinical();
    return res.send(all);
  };
  public getAllAntibiotic = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const all = await this.service.getAntibiotic();
    return res.send(all);
  };
}
export default CategoryController;
