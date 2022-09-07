import {NextFunction, Request, Response} from 'express';
import { CreateAntibioticDto, CreateClinicalDto, UpdateAntibioticDto, UpdateClinicalDto } from '../dtos/diagnosis.dto';
import CategoryService from '../services/category.service';
import DiagnosisService from '../services/diagnosis.service';

class DiagnosisController {
  private service = new DiagnosisService();
  private cService = new CategoryService();
  public createAntiBioticGuide = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: CreateAntibioticDto = req.body;
      const catExist = this.cService.existAntibiotic(data.category);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const nameExist = this.service.existsAntibiotic(data.name);
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = this.service.createAntibiotic(data);
      if (created) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
  public createClinicalGuide = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: CreateClinicalDto = req.body;
      const catExist = this.cService.existClinical(data.category);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const nameExist = this.service.existsClinical(data.disease);
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = this.service.createClinical(data);
      if (created) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
  public updateAntiBioticGuide = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: UpdateAntibioticDto = req.body;
      const catExist = this.cService.existAntibiotic(data.category);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const nameExist = this.service.antibioticNameIsDup(data.name, data.id);
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = this.service.updateAntibioticGuide(data);
      if (created) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
  public updateClinicalGuide = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: UpdateClinicalDto = req.body;
      const catExist = this.cService.existClinical(data.category);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const nameExist = this.service.clinicalNameIsDup(data.disease, data.id);
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = this.service.updateClinicalGuide(data);
      if (created) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
}

export default DiagnosisController;
