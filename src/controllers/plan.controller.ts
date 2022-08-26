import { NextFunction, Request, Response } from "express";
import { CreatePlanDto, UpdatePlanDto } from "../dtos/plan.dto";
import PlanService from "../services/plan.services";
import { Gateway } from "../utils/gateway";


class PlanController {
  private service = new PlanService();
  private gateway = new Gateway();
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.gateway.init()
      const data: CreatePlanDto = req.body;
      const saved = await this.gateway.createPlan(
        data.name,
        data.price,
        data.description,
      );
      if (saved) {
        const plan = await this.service.createPlan({...data}, saved);
        return res.status(200).send({message: 'success',plan});
      }
      return res.status(200).send({message: 'failed', });
    } catch (error) {
      next(error);
    }
  };
  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plan = await this.service.findAllPlans();
      return res.status(200).send({message: 'success', plan});
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.gateway.init();
      const data:UpdatePlanDto = req.body;
       const plan = await this.service.findPlanById(data.id);
       if (!plan) {
          return res.status(200).send({message: 'failed', reason:'plan not found'});
       }
    
        const check = await this.service.findPlanByName (data.name)
        if (check && check._id.toString() != plan._id) {
          return res
            .status(200)
            .send({message: 'failed', reason: 'another plan has this name'});
        }
       const saved = await this.gateway.updatePlan(
         data.name,
         data.price,
         data.description,
         plan.paystack_code
       );
        if (!saved) {
          return res
            .status(200)
            .send({message: 'failed', reason: 'error occurred'});
        }
       const planUpd = await this.service.updatePlan(data.id, {
         name:data.name,
         description:data.description,
         price:data.price,
         spaces:data.spaces
       });
      

      return res.status(200).send({message: 'success'});
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body;
      const plan = await this.service.deletePlan(id);
      return res.status(200).send({message: 'success'});
    } catch (error) {
      next(error);
    }
  };
}

export default PlanController;
