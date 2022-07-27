import {NextFunction, Request, Response} from 'express';
import {SetGatewayDto, SetKeyDto} from '../dtos/settings.dto';
import {SettingsService} from '../services/settings.services';

class SettingsController {
  private service = new SettingsService();
  public setKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: SetKeyDto = req.body;
      if (data.name == 'paystack' || data.name == 'flutterwave') {
        const success = await this.service.setKey(data);
        if (success) {
          return res.status(200).send({
            msg: 'success',
          });
        }
        return res.status(401).send({
          msg: 'failed',
          reason: 'an error occurred',
        });
      }
      return res
        .status(401)
        .send({msg: 'failed', reason: 'key must be flutterwave or paystack'});
    } catch (e) {
      next(e);
    }
  };
  public getKeys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keys = await this.service.findAllKeys();
      return res.status(401).send(keys);
    } catch (e) {
      next(e);
    }
  };
  public getGateway = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const gateway = await this.service.getCurrentPayGateWay();
      if (gateway == null) {
        return res.status(401).send({msg: 'no gateway'});
      }
      return res.status(200).send(gateway);
    } catch (e) {
      next(e);
    }
  };
  public setGateway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: SetGatewayDto = req.body;
      if (data.name == 'paystack' || data.name == 'flutterwave') {
        const success = await this.service.setCurrentPayGateWay (data.name)
        if (success) {
          return res.status(200).send({
            msg: 'success',
          });
        }
        return res.status(401).send({
          msg: 'failed',
          reason: 'an error occurred',
        });
      }
      return res
        .status(401)
        .send({msg: 'failed', reason: 'name must be flutterwave or paystack'});
    } catch (e) {
      next(e);
    }
  };
}

export default SettingsController;
