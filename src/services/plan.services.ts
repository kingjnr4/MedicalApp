import {UpdateWriteOpResult} from 'mongoose';
import {CreatePlanDto} from '../dtos/plan.dto';
import {HttpException} from '../exceptions/HttpException';
import {IPlan, PlanDoc} from '../interfaces/plans.interface';
import planModel from '../models/plan.model';
import {isEmpty} from '../utils/utils';

class PlanService {
  async findPlanByName(name: string) {
    const Plan = await this.model.findOne({name});
    if (!Plan) return null;
    return Plan;
  }
  public model = planModel;
  public async findAllPlans(): Promise<IPlan[]> {
    const plans: IPlan[] = await this.model.find();
    return plans;
  }
  public async findPlanById(planId: string): Promise<IPlan> {
    if (isEmpty(planId)) throw new HttpException(400, 'No Id passed');

    const Plan = await this.model.findById(planId);
    if (!Plan) throw new HttpException(409, 'Plan not found');
    return Plan;
  }
  public async createPlan(
    planData: CreatePlanDto,
    codes: any,
  ): Promise<PlanDoc> {
    if (isEmpty(planData))
      throw new HttpException(400, 'Please make sure all fields are filled');

    const findPlan = await this.model.findOne({name: planData.name});
    if (findPlan) throw new HttpException(409, `Plan name  is in use`);

    const createPlanData: PlanDoc = await this.model.create({
      ...planData,
      paystack_code: codes.paystack,
    });
    return createPlanData;
  }
  public async updatePlan(id: string, planData: CreatePlanDto): Promise<IPlan> {
    if (isEmpty(planData))
      throw new HttpException(400, 'Please make sure all fields are filled');

    const findPlan = await this.model.findById(id);
    if (!findPlan) throw new HttpException(409, `Plan does not exist`);
    findPlan.name = planData.name;
    findPlan.spaces = planData.spaces;
    findPlan.price = planData.price;
    findPlan.description = planData.description;
    await findPlan.save();
    return findPlan;
  }

  public async deletePlan(planId: string): Promise<IPlan> {
    const deletePlanById = await this.model.findByIdAndDelete(planId);
    if (!deletePlanById) throw new HttpException(409, 'Plan not found');
    return deletePlanById;
  }
}

export default PlanService;
