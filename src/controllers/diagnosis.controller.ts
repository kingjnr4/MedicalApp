import {NextFunction, Request, Response} from 'express';
import { DeleteCatDto } from '../dtos/category.dto';
import { CreateAntibioticDto, CreateClinicalDto, DeleteAntibioticDto, SearchDto, UpdateAntibioticDto, UpdateClinicalDto } from '../dtos/diagnosis.dto';
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
      // const hasGuide = await this.cService.hasGuideAntibiotic(data.category);
      // if (hasGuide) {
      //   return res.send({
      //     message: 'failed',
      //     reason: 'category has guide',
      //   });
      // }
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
      // const hasGuide = await this.cService.hasGuideClinical(data.category);
      // if (hasGuide) {
      //   return res.send({
      //     message: 'failed',
      //     reason: 'category has guide',
      //   });
      // }
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
  public deleteClinicalGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: DeleteAntibioticDto = req.body;

      const deleted = await this.service.deleteClinicalGuide(data.id);
      if (deleted) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };
  public deleteAntibioticGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: DeleteAntibioticDto = req.body;

      const deleted = await this.service.deleteAntibioticGuide(data.id);
      if (deleted) {
        return res.send({message: 'success'});
      }
      return res.send({message: 'failed', reason: 'error occured'});
    } catch (error) {
      next(error);
    }
  };

  public getAntibioticGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.service.getAntibiotic();
      return res.send(data);
    } catch (error) {}
  };
  public getClinicalGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.service.getClinical();
      return res.send(data);
    } catch (error) {}
  };
  public getAntibioticGuideSingle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body:DeleteCatDto = req.body
      const data = await this.service.getAntibioticById(body.id);
      if (data==null) {
         return res.send({
           message: 'failed',
           reason: 'guide does not exist',
         });
      }
      return res.send(data);
    } catch (error) {}
  };
  public getClinicalGuideSingle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
       const body: DeleteCatDto = req.body;

      const data = await this.service.getClinicalById(body.id);
        if (data == null) {
          return res.send({
            message: 'failed',
            reason: 'guide does not exist',
          });
        }
      return res.send(data);
    } catch (error) {}
  };
  public singleCategoryAntibiotic = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body: SearchDto = req.body;
      const catExist = await this.cService.existAntibiotic(body.name);
      if (!catExist) {
        return res.send({
          message: 'failed',
          reason: 'category does not exist',
        });
      }
      const hasChildren = await this.cService.hasChildrenAntibiotic(body.name);
      if (hasChildren) {
        const all = await this.cService.getAntibioticChildren(body.name);
        return res.send({message: 'success', type: 'categories', data: all});
      } else {
        const all = await this.service.getAntibioticChildren(body.name);
        return res.send({message: 'success', type: 'diagnosis', data: all});
      }
    } catch (error) {}
  };
  public singleCategoryClinical = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body: SearchDto = req.body;
      const catExist = await this.cService.existClinical(body.name);
      if (!catExist) {
        return res.send({message: 'failed', reason: 'category does not exist'});
      }
      const hasChildren = await this.cService.hasChildrenClinical(body.name);
      if (hasChildren) {
        const all = await this.cService.getClinicalChildren(body.name);
        return res.send({message: 'success', type: 'categories', data: all});
      } else {
        const all = await this.service.getClinicalChildren(body.name);
        return res.send({message: 'success', type: 'diagnosis', data: all});
      }
    } catch (error) {}
  };
  public searchClinicalGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body: SearchDto = req.body;
      const data = await this.cService.searchClinical(body.name);
      return res.send(data);
    } catch (error) {}
  };
  public searchAntibioticGuide = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body: SearchDto = req.body;
      const data = await this.cService.searchAntibiotic(body.name);
      return res.send(data);
    } catch (error) {}
  };
}

export default DiagnosisController;
