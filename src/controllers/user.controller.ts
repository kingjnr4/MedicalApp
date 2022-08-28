import {NextFunction, Request, Response} from 'express';
import {
  BlockUserDto,
  ChangePassDto,
  CreateUserDto,
  GenLinkDto,
  LoginUserDto, UnBlockUserDto,
  UpdateUserDto,
  VerifyUserDto,
} from '../dtos/user.dto';
import {HttpException} from '../exceptions/HttpException';
import {IUser, UserDoc} from '../interfaces/user.interface';
import UserService from '../services/user.services';
import NotifService from '../services/notification.service';
import {Gateway} from '../utils/gateway';
import {generateJWT} from '../utils/jwt';
import {logger} from '../utils/logger';
import {getMailForBlock, getMailForPass, getMailForUnBlock, getMailForVerify, sendmail} from '../utils/mail';
import {Paystack} from '../utils/paystack';
import {
  generateVerificationToken,
  getIdFromToken,
  verifyVerificationToken,
} from '../utils/token';
import blockModel from '../models/block.model';

class UserController {
  private service = new UserService();
  private gateway = new Gateway();
  private notifService = new NotifService()
  get(req: Request, res: Response, next: NextFunction) {
    const user: UserDoc = req['user'];
    const userObj = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      verified: user.verified,
      email: user.email,
      number: user.number,
      hasCard:user.hasCard,
      joined:user.joined
    };
    return res.status(200).send(userObj);
  }
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.gateway.init();
      const data: CreateUserDto = req.body;
      const user = await this.service.createUser(data);
      const saved = await this.gateway.createCustomer(data.email);
      if (saved == false) {
        return res
          .status(200)
          .send({message: 'failed', reason: 'internal server error'});
      }
      const token = await generateVerificationToken(user._id);
      const mail = getMailForVerify(token, user.email);
      sendmail(mail)
        .then(msg => {
          logger.info(msg);
          return res.status(200).send({message: 'success'});
        })
        .catch(e => next(e));
    } catch (e) {
      next(e);
    }
  };
  public addCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserDoc = req['user'];
      await this.gateway.init();
      const data = await this.gateway.initCard(user.email);
      return res.status(200).send({message: 'success', url: data});
    } catch (e) {}
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginUserDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
      const isvalid = await user.checkPassword(data.password);
      if (isvalid == false) {
        throw new HttpException(401, 'your password is incorrect');
      }
      if (user.verified == false) {
        throw new HttpException(401, ' verify your email');
      }
      if (user.status == "blocked") {
        const blockInfo = await blockModel.findOne({user:user._id})
        return res
          .status(200)
          .send({message: 'blocked',reason:blockInfo.reason});
      }
      const fields = {
        firstname: user.firstname ? true : false,
        lastname: user.lastname ? true : false,
        number: user.number ? true : false,
      };
      const jwt = generateJWT(user._id);
      const details = {name: user.username, verified: user.verified, fields};
      // res.cookie('refreshToken',jwt.refreshToken)
      return res
        .status(200)
        .send({message: 'success', accessToken: jwt.accessToken, details});
    } catch (e) {
      next(e);
    }
  };
  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: VerifyUserDto = req.body;
      const isValid = await verifyVerificationToken(data.key);
      const id = await getIdFromToken(data.key);
      if (isValid && id !== '') {
        const verified = await this.service.verify(id);
        return res.status(200).send({message: 'success', verified});
      }
      return res.status(200).send({message: 'failed'});
    } catch (e) {
      next(e);
    }
  };
  public changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
  public generateLink = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: GenLinkDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
      if (user.verified) {
        return res.status(409).send({message: 'user already verified'});
      }
      const token = await generateVerificationToken(user._id);
      const mail = getMailForVerify(token, user.email);
      sendmail(mail)
        .catch(e => {
          return res.status(200).send({message: 'failed'});
        })
        .then(msg => {
          return res.status(200).send({message: 'success'});
        });
    } catch (e) {
      next(e);
    }
  };
  public generatePasswordLink = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: GenLinkDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
      const token = await generateVerificationToken(user._id);
      const mail = getMailForPass(token, user.email);
      sendmail(mail)
        .then(msg => {
          return res.status(200).send({message: 'success'});
        })
        .catch(e => {
          return res.status(200).send({message: 'failed', e});
        });
    } catch (e) {
      next(e);
    }
  };
  /**
   * updateInfo
   */
  public updateInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: UpdateUserDto = req.body;
      const user: UserDoc = req['user'];
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.number = data.number;
      await this.gateway.init();
      const saved = await this.gateway.updateCustomer(
        user.email,
        user.firstname,
        user.lastname,
        user.number,
      );
      if (saved) {
        await user.save();
        return res.status(200).send({message: 'success'});
      }
      return res.status(200).send({message: 'failed'});
    } catch (e) {
      next();
      console.log(e);
    }
  };
  public block = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: BlockUserDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
      if (user) {
       await blockModel.create({
          user:user._id,
          reason:data.reason
        })
        user.status = 'blocked';
        await user.save();
       const mail = getMailForBlock(user.email,data.reason)
        sendmail(mail).then(msg=>{return res.status(200).send({message: 'success'})}) .catch(e => {
          return res.status(200).send({message: 'failed', e});
        });
        return ;
      }
      return res
        .status(200)
        .send({message: 'failed', reason: 'user not found'});
    } catch (e) {
      next(e);
    }
  };
  public unblock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: UnBlockUserDto = req.body;
      const user = await this.service.findUserByEmail(data.email);
      if (user) {
        await blockModel.deleteOne({
          user:user._id
        })
        user.status = 'open';
        await user.save();
        const mail = getMailForUnBlock(user.email)
        sendmail(mail).then(msg=>{return res.status(200).send({message: 'success'})}) .catch(e => {
          return res.status(200).send({message: 'failed', e});
        });
        return ;
      }
      return res
        .status(200)
        .send({message: 'failed', reason: 'user not found'});
    } catch (e) {
      next(e);
    }
  };
  public getNotif = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user:IUser = req['user']
      const notifications = (await this.notifService.getAllNotification (user)).reverse()
       return res
         .status(200)
         .send(notifications);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
