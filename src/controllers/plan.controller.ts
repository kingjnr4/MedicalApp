import { NextFunction, Request, Response } from "express";
import { CreatePlanDto } from "../dtos/plan.dto";
import PlanService from "../services/plan.services";
import { Paystack } from "../utils/paystack";

class PlanController {
  private service = new PlanService();
 private paystack = new Paystack();
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreatePlanDto = req.body;
      const plan = await this.service.createPlan({...data});
      return res.status(200).send({ message: 'success', plan });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const plan = await this.service.updatePlan(data.id, data.plan);
      return res.status(200).send({ message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body;
      const plan = await this.service.deletePlan(id);
      return res.status(200).send({ message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default PlanController;
