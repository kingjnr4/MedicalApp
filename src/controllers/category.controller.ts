import {NextFunction, Request, Response} from 'express';
import {CreateCatDto, DeleteCatDto, UpdateCatDto} from '../dtos/category.dto';
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
      const hasGuide = await this.service.hasGuideClinical(data.parent);
      if (hasGuide) {
        return res.send({
          message: 'failed',
          reason: 'category has guide',
        });
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
        const hasGuide = await this.service.hasGuideAntibiotic(data.parent);
        if (hasGuide) {
          return res.send({
            message: 'failed',
            reason: 'category has guide',
          });
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
  public getAllClinicalNoChildren = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const all = await this.service.getClinicalWithoutChildren();
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
  public getAllAntibioticNoChildren = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const all = await this.service.getAntibioticWithoutChildren();
    return res.send(all);
  };
  public updateAntibiotic = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const data: UpdateCatDto = req.body;
    const exist = await this.service.existAntibioticId(data.id);
    if (!exist) {
      return res.send({message: 'failed', reason: 'category does not exist'});
    }
    const nameExist = await this.service.antibioticCatNameIsDup(
      data.name,
      data.id,
    );
    if (nameExist) {
      return res.send({message: 'failed', reason: 'name already exist'});
    }
    const updated = await this.service.updateAntibiotic(data);
    if (updated) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'error occured'});
  };
  public updateClinical = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const data: UpdateCatDto = req.body;
    const exist = await this.service.existClinicalId(data.id);
    if (!exist) {
      return res.send({message: 'failed', reason: 'category does not exist'});
    }
    const nameExist = await this.service.clinicalCatNameIsDup(
      data.name,
      data.id,
    );
    if (nameExist) {
      return res.send({message: 'failed', reason: 'name already exist'});
    }
    const updated = await this.service.updateClinical(data);
    if (updated) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'error occured'});
  };

  public deleteAntibiotic = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const data: DeleteCatDto = req.body;
    const exist = await this.service.existAntibioticId(data.id);
    if (!exist) {
      return res.send({message: 'failed', reason: 'category does not exist'});
    }
    const updated = await this.service.deleteAntibiotic(data.id);
    if (updated) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'error occured'});
  };
  public deleteClinical = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const data: DeleteCatDto = req.body;
    const exist = await this.service.existClinicalId(data.id);
    if (!exist) {
      return res.send({message: 'failed', reason: 'category does not exist'});
    }
    const updated = await this.service.deleteClinical(data.id);
    if (updated) {
      return res.send({message: 'success'});
    }
    return res.send({message: 'failed', reason: 'error occured'});
  };
}
export default CategoryController;
