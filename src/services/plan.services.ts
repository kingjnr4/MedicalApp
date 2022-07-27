import { UpdateWriteOpResult } from "mongoose";
import { CreatePlanDto } from "../dtos/plan.dto";
import { HttpException } from "../exceptions/HttpException";
import { IPlan } from "../interfaces/plans.interface";
import planModel from "../models/plan.model";
import { isEmpty } from "../utils/utils";

class PlanService {
  public model = planModel;
  public async findAllPlans(): Promise<IPlan[]> {
    const plans: IPlan[] = await this.model.find();
    return plans;
  }
  public async findPlanById(planId: string): Promise<IPlan> {
    if (isEmpty(planId)) throw new HttpException(400, "No Id passed");

    const Plan = await this.model.findOne({ _id: planId });
    if (!Plan) throw new HttpException(409, "Plan not found");
    return Plan;
  }
  public async createPlan(planData: CreatePlanDto): Promise<IPlan> {
    if (isEmpty(planData))
      throw new HttpException(400, "Please make sure all fields are filled");

    const findPlan = await this.model.findOne({ name: planData.name });
    if (findPlan) throw new HttpException(409, `Plan name  is in use`);
    const createPlanData: IPlan = await this.model.create({
      ...planData,
    });
    return createPlanData;
  }
  public async updatePlan(
    id: string,
    planData: CreatePlanDto
  ): Promise<UpdateWriteOpResult> {
    if (isEmpty(planData))
      throw new HttpException(400, "Please make sure all fields are filled");

    const findPlan = await this.model.findOne({ _id: id });
    if (!findPlan) throw new HttpException(409, `Plan does not exist`);
    const createPlanData = await this.model.updateOne({
      ...planData,
    });
    return createPlanData;
  }

  public async deletePlan(planId: string): Promise<IPlan> {
    const deletePlanById = await this.model.findByIdAndDelete(planId);
    if (!deletePlanById) throw new HttpException(409, "Plan not found");
    return deletePlanById;
  }
}

export default PlanService;