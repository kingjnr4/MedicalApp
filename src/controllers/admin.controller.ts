import {NextFunction, Request, Response} from 'express';
import {CreateAdminDto, DeleteAdminDto, LoginAdminDto} from '../dtos/admin.dto';
import {ChangePassDto, GenLinkDto} from '../dtos/user.dto';
import {HttpException} from '../exceptions/HttpException';
import AdminService from '../services/admin.services';
import {generateJWT} from '../utils/jwt';
import {getAdminMailForPass, sendmail} from '../utils/mail';
import {generateVerificationToken, getIdFromToken, verifyVerificationToken} from '../utils/token';
import {IAdmin} from '../interfaces/admin.interface';
import NotifService from '../services/notification.service';

class AdminController {
  private service = new AdminService();
  private notifService = new NotifService()
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateAdminDto = req.body;
      const admin = await this.service.createAdmin(data);

      const details = {name: admin.username};
      return res.status(200).send({message: 'success', details});
    } catch (e) {
      next(e);
    }
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginAdminDto = req.body;
      const admin = await this.service.findAdminByEmail(data.email);
      const isvalid = admin.checkPassword(data.password);
      if (isvalid == false) {
        throw new HttpException(401, 'your password is incorrect');
      }
      const jwt = generateJWT(admin._id);
      return res.status(200).send({message: 'success', jwt});
    } catch (e) {
      next(e);
    }
  };
  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: ChangePassDto = req.body;
      const isValid = await verifyVerificationToken(data.key);
      const id = await getIdFromToken(data.key);
      if (isValid && id !== '') {
        const verified = await this.service.changePass(id, data.password);
        return res.status(200).send({message: 'success', verified});
      }
      return res.status(200).send({message: 'failed'});
    } catch (e) {
      next(e);
    }
  };
  public generatePasswordLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: GenLinkDto = req.body;
      const user = await this.service.findAdminByEmail(data.email);
      const token = await generateVerificationToken(user._id);
      const mail = getAdminMailForPass(token, user.email);
      sendmail(mail)
        .then(_msg => {
          return res.status(200).send({message: 'success'});
        })
        .catch(e => {
          return res.status(200).send({message: 'failed', e});
        });
    } catch (e) {
      next(e);
    }
  };
  public getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admins = await this.service.findAllAdmin();
      return res.status(200).send({admins});
    } catch (e) {
      next(e);
    }
  };
  public deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
   try {
     const data: DeleteAdminDto = req.body;
     const admin = await this.service.findAdminByEmail(data.email);
     if (admin.role == 'super') {
       return res.send({message: 'failed', reason: 'cannot delete super admin'});
     }
     await this.service.deleteAdmin(admin);
     return res.send({message: 'success', admin});
   }catch (e) {
     next(e)
   }
  };
  public getInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin: IAdmin = req['admin'];
    return res.send({
      username: admin.username, role: admin.role, email: admin.email,
    });
  }catch (e) {
    next(e)
  }
  };
  public getNotifs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifs = this.notifService.getAllNotificationByAdmin()
    return res.send(notifs);
  }
  catch (e) {
    next(e)
  }
  };
}

export default AdminController;


