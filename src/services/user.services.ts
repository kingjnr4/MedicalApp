import { isEmpty } from "class-validator";
import { CreateUserDto } from "../dtos/user.dto";
import { HttpException } from "../exceptions/HttpException";
import { IUser } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class UserService {
  public model = userModel;
  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.model.find();
    return users;
  }
  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, "No userId passed");

    const user  = await this.model.findOne({ _id: userId });
    if (!user) throw new HttpException(409, "You're not user");
    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "Please make sure all fields are filled");

    const findUser = await this.model.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email} already exists Log in instead`
      );

    const createUserData: IUser = await this.model.create({
      ...userData,
    });

    return createUserData;
  }

 

  public async deleteUser(userId: string): Promise<IUser> {
    const deleteUserById = await this.model.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");
    return deleteUserById;
  }
}
export default UserService