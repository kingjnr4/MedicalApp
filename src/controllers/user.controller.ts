import {NextFunction, Request, Response} from 'express';
import {
  BlockUserDto,
  ChangePassDto,
  CreateUserDto,
  GenLinkDto,
  LoginUserDto,
  UpdateUserDto,
  VerifyUserDto,
} from '../dtos/user.dto';
import {HttpException} from '../exceptions/HttpException';
import {IUser, UserDoc} from '../interfaces/user.interface';
import UserService from '../services/user.services';
import {Gateway} from '../utils/gateway';
import {generateJWT} from '../utils/jwt';
import {logger} from '../utils/logger';
import {getMailForPass, getMailForVerify, sendmail} from '../utils/mail';
import {Paystack} from '../utils/paystack';
import {
  generateVerificationToken,
  getIdFromToken,
  verifyVerificationToken,
} from '../utils/token';

class UserController {
  private service = new UserService();
  private gateway = new Gateway();
  get(req: Request, res: Response, next: NextFunction) {
    const user: UserDoc = req['user'];
    const userObj = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      verified: user.verified,
      email: user.email,
      number: user.number,
    };
    return res.status(200).send(userObj);
  }
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateUserDto = req.body;
      const user = await this.service.createUser(data);
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
      }+6
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
      const saved = await this.gateway.createCustomer(
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
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;
