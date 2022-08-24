import subModel from "../models/subscription.model";
import userModel from "../models/user.model";

class StatsService {
  public async getUserlen() {
    const users = await userModel.find();
    return users.length || 0;
  }
  public async getActiveSubLen() {
    const subs = await subModel.find({status: 'active'});
    return subs.length || 0;
  }
  public async getCancelledSubLen() {
    const subs = await subModel.find({status: 'not-renewing'});
    return subs.length || 0;
  }
  public async getEndedSubLen() {
    const subs = await subModel.find({status: 'ended'});
    return subs.length || 0;
  }
}

export default StatsService
