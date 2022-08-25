import { CreateUserDto } from "../dtos/user.dto";
import { HttpException } from "../exceptions/HttpException";
import { IUser, UserDoc } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import { hashPassword, isEmpty } from "../utils/utils";

class UserService {
  public model = userModel;
  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.model.find();
    return users;
  }
  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'No userId passed');

    const user = await this.model.findOne({_id: userId});
    if (!user) throw new HttpException(409, 'User not found');
    return user;
  }
  public async findUserByEmail(email: string): Promise<UserDoc> {
    if (isEmpty(email)) throw new HttpException(400, 'No Email passed');

    const user = await this.model.findOne({
      email: {$regex: new RegExp(email, 'i')},
    });
    if (!user) throw new HttpException(409, 'User not found');
    return user;
  }
  public async createUser(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData))
      throw new HttpException(400, 'Please make sure all fields are filled');

    const findEmail = await this.model.findOne({email: userData.email});
    const findName = await this.model.findOne({username: userData.username});
    if (findEmail) throw new HttpException(409, ` email is in use`);
    if (findName) throw new HttpException(409, ` username is in use`);

    const createUserData: IUser = await this.model.create({
      ...userData,
    });

    return createUserData;
  }
  public async verify(userId: string): Promise<Boolean> {
    const user = await this.model.findById(userId);
    if (user == null) {
      throw new HttpException(409, `User not found`);
    }
    if (user.verified) {
      throw new HttpException(200, `User already verified`);
    }
    user.verified = true;
    user?.save();
    return true;
  }
  public async changePass(userId: string,password:string): Promise<Boolean> {
    const user = await this.model.findById(userId);
    if (user == null) {
      throw new HttpException(409, `User not found`);
    }
    user.password = await hashPassword (password);
    user?.save();
    return true;
  }
  public async deleteUser(userId: string): Promise<IUser> {
    const deleteUserById = await this.model.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");
    return deleteUserById;
  }
}
export default UserService;
