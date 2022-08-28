import {NextFunction, Request, Response} from 'express';
import {
  ChangeMailDto,
  CreateAdminDto,
  DeleteAdminDto,
  DeleteNotifDto,
  LoginAdminDto,
  UpdateAdminDto,
} from '../dtos/admin.dto';
import {ChangePassDto, GenLinkDto} from '../dtos/user.dto';
import {HttpException} from '../exceptions/HttpException';
import AdminService from '../services/admin.services';
import {generateJWT} from '../utils/jwt';
import {getAdminMailForPass, sendmail} from '../utils/mail';
import {generateVerificationToken, getIdFromToken, verifyVerificationToken} from '../utils/token';
import {AdminDoc, IAdmin} from '../interfaces/admin.interface';
import NotifService from '../services/notification.service';
import {hashPassword} from '../utils/utils';

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
      return res.status(200).send({message: 'success', jwt,info:{
          username: admin.username, role: admin.role, email: admin.email,
        }});
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
  public changeEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: ChangeMailDto = req.body;
      const admin:AdminDoc = req['admin']
      const exists = await this.service.getAdminByEmail(data.email)
      if (admin.email==data.email){
        return res.status(200).send({message: 'failed',reason:'email was not changed'});
      }
      if (exists){
        return res.status(200).send({message: 'failed',reason:'email exist'});
      }
      admin.email=data.email
      await admin.save()
        return res.status(200).send({message: 'success', admin});
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
  public deleteNotifications = async (req: Request, res: Response, next: NextFunction) => {
   try {
     const data: DeleteNotifDto = req.body;
     const deleted = await this.notifService.deleteAll(data.id)
     if (deleted){
       return res.status(200).send({message:'Success'});
     }
     return res.status(200).send({message:'failed',reason:'Id does not exist'});
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
  public updateInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: UpdateAdminDto = req.body;
    const info = {
      email: data.email || undefined,
      password: data.password ? await hashPassword(data.password) : undefined,
      username: data.username || undefined,
      role: data.role || undefined,
    };
    const admin = await this.service.findAdminByEmail(data.oldMail)
    if (data.email && data.email != data.oldMail) {
      const admin = await this.service.getAdminByEmail (data.email)
      if (admin) {
         return res.status(200).send({message: 'failed',reason:'email already exists'});
      }
    }
    
    await admin.update({...info})
    return res.status(200).send({message:'success'});
  }catch (e) {
    next(e)
  }
  };
  public getNotifs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifs = await this.notifService.getAllNotificationByAdmin()
    return res.send(notifs);
  }
  catch (e) {
    next(e)
  }
  };
}

export default AdminController;


