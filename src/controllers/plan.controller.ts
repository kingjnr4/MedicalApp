import { NextFunction, Request, Response } from "express";
import { CreatePlanDto } from "../dtos/plan.dto";
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
        const plan = await this.service.createPlan({...data}, saved.paystack);
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
      const data = req.body;
      const plan = await this.service.updatePlan(data.id, data.plan);
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
