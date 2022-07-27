import { CreateAdminDto } from "../dtos/admin.dto";
import { HttpException } from "../exceptions/HttpException";
import { IAdmin } from "../interfaces/admin.interface";
import adminModel from "../models/admin.model";
import { isEmpty } from "../utils/utils";

class AdminService {
  public model = adminModel;
  public async findAllAdmin(): Promise<IAdmin[]> {
    const admins: IAdmin[] = await this.model.find();
    return admins;
  }
  public async findAdminById(adminId: string): Promise<IAdmin> {
    if (isEmpty(adminId)) throw new HttpException(400, 'No adminId passed');

    const admin = await this.model.findOne({_id: adminId});
    if (!admin) throw new HttpException(409, 'User not found');
    return admin;
  }
  public async findAdminByEmail(email: string): Promise<IAdmin> {
    if (isEmpty(email)) throw new HttpException(400, 'No email passed');

    const admin = await this.model.findOne({email});
    if (!admin) throw new HttpException(409, 'Admin not found');
    return admin;
  }
  public async createAdmin(adminData: CreateAdminDto): Promise<IAdmin> {
    if (isEmpty(adminData))
      throw new HttpException(400, 'Please make sure all fields are filled');

    const findEmail = await this.model.findOne({email: adminData.email});
    const findName = await this.model.findOne({username: adminData.username});
    if (findEmail) throw new HttpException(409, ` email is in use`);
    if (findName) throw new HttpException(409, ` username is in use`);

    const createAdminData: IAdmin = await this.model.create({
      ...adminData,
    });

    return createAdminData;
  }
}
export default AdminService;
