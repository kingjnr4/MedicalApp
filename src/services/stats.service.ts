import subModel from "../models/subscription.model";
import userModel from "../models/user.model";

class StatsService {
  public async getUserlen() {
    const users = await userModel.count();
    return users
  }
  public async getActiveSubLen() {
    const subs = await subModel.count({status: 'active'});
    return subs
  }
  public async getCancelledSubLen() {
    const subs = await subModel.count({status: 'non-renewing'});
    return subs
  }
  public async getEndedSubLen() {
    const subs = await subModel.count({status: 'ended'});
    return subs
  }
  public async getAllUsers(){
    const users = await userModel.find()
    let result=[]
    if (users !=null ) {
      for ( let i = 0; i < users.length; i++) {
        const user = users[i]
        result.push(
            {
                username:user.username,
                email:user.email,
                status:user.status
            }
        )
      }
      return result
  }
}
}
export default StatsService
