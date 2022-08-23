import userModel from "../models/user.model";

class StatsService {
    public async getUserlen (){
        const users = await userModel.find ()
        return users.length
    }
}

export default StatsService
