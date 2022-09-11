import {NextFunction, Request, Response} from 'express';
import { CreateAntibioticDto, CreateClinicalDto, UpdateAntibioticDto, UpdateClinicalDto } from '../dtos/diagnosis.dto';
import CategoryService from '../services/category.service';
import DiagnosisService from '../services/diagnosis.service';

class DiagnosisController {
  private service = new DiagnosisService();
  private cService = new CategoryService();
  public createAntiBioticGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: CreateAntibioticDto = req.body;
      const catExist = await this.cService.existAntibiotic(data.category);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const nameExist = await this.service.existsAntibiotic(data.name);
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = await this.service.createAntibiotic(data);
      if (created) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
  public createClinicalGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: CreateClinicalDto = req.body;
      const catExist = await this.cService.existClinical(data.category);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const nameExist = await this.service.existsClinical(data.disease);
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = await this.service.createClinical(data);
      if (created) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
  public updateAntiBioticGuide = async (
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
      const nameExist = await this.service.antibioticNameIsDup(
        data.name,
        data.id,
      );
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = await this.service.updateAntibioticGuide(data);
      if (created) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
  public updateClinicalGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: UpdateClinicalDto = req.body;
      const catExist = await this.cService.existClinical(data.category);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const nameExist = await this.service.clinicalNameIsDup(
        data.disease,
        data.id,
      );
      if (nameExist) {
        return res.send({message: 'failed', reason: 'name already exist'});
      }
      const created = await this.service.updateClinicalGuide(data);
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
