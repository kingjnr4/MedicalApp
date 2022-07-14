import { NextFunction, Request, Response } from "express";
import { CreatePlanDto } from "../dtos/plan.dto";
import PlanService from "../services/plan.services";

class PlanController {
  private service = new PlanService();
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data:CreatePlanDto = req.body
     const plan = await this.service.createPlan(data);
     return res.status(200).send({ message: "success" });
    } catch (error) {
      next(error);
    }
  };
  public update = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("<h1>hello after hrs </h1>");
    } catch (error) {
      next(error);
    }
  };
  public delete = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("<h1>hello after hrs </h1>");
    } catch (error) {
      next(error);
    }
  };
}

export default PlanController;
