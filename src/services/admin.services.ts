import { CreateAdminDto } from "../dtos/admin.dto";
import { HttpException } from "../exceptions/HttpException";
import {AdminDoc, IAdmin} from '../interfaces/admin.interface';
import adminModel from "../models/admin.model";
import { hashPassword, isEmpty } from "../utils/utils";

class AdminService {
  public model = adminModel;
  public async findAllAdmin(): Promise<IAdmin[]> {
    const admins: IAdmin[] = await this.model.find({role:{$ne:'super'}});
    const result = [];
    if (admins) {
      for (let i = 0; i < admins.length; i++) {
        const admin = admins[i]
        result.push({
          username: admin.username, role: admin.role, email: admin.email,
        })
      }}
    return result;
  }
  public async deleteAdmin (admin:IAdmin){
    const deleted = await this.model.findByIdAndDelete(admin._id)
    if (!deleted) throw new HttpException(409, 'Admin not found');
    return deleted
  }
  public async findAdminById(adminId: string): Promise<IAdmin> {
    if (isEmpty(adminId)) throw new HttpException(400, 'No adminId passed');

    const admin = await this.model.findOne({_id: adminId});
    if (!admin) throw new HttpException(409, 'User not found');
    return admin;
  }
  public async findAdminByEmail(email: string): Promise<AdminDoc> {
    if (isEmpty(email)) throw new HttpException(400, 'No email passed');

    const admin = await this.model.findOne({email});
    if (!admin) throw new HttpException(409, 'Admin not found');
    return admin;
  }
  public async getAdminByEmail(email: string): Promise<IAdmin> {
    if (isEmpty(email)) throw new HttpException(400, 'No email passed');

    const admin = await this.model.findOne({email});
    if (!admin) return null;
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
  public async changePass(id: string, password: string): Promise<Boolean> {
    const admin = await this.model.findById(id);
    if (admin == null) {
      throw new HttpException(409, `User not found`);
    }
    admin.password = await hashPassword(password);
    admin?.save();
    return true;
  }
}
export default AdminService;
