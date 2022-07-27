import {ISettings} from '../interfaces/settings.interface';
import keyModel from '../models/key.model';
import settingsModel from '../models/settings.model';
import {IKey} from '../interfaces/key.interface';
import {logger} from '../utils/logger';
import { SetKeyDto } from '../dtos/settings.dto';

export class SettingsService {
  private model = settingsModel;
  public async findAllKeys(): Promise<IKey[]> {
    const keys: IKey[] = await keyModel.find();
    return keys;
  }
  public async findKeyByName(name:string): Promise<IKey> {
    const keys: IKey = await keyModel.findOne({name});
    return keys;
  }
  public async setKey(data: SetKeyDto): Promise<boolean> {
    try {
      const exist = await keyModel.findOne({name:data.name});
      if (exist) {
        exist.public = data.public;
        exist.secret=data.secret
        exist.save();
        return true
      }
      await keyModel.create(data);
      return true;
    } catch (e) {
      return false;
    }
  }
  public async getCurrentPayGateWay(): Promise<IKey['name']> {
    const current: ISettings = await this.model.findOne({
      prop: 'gateway',
    });
    return current.value as IKey['name'];
  }
  public async setCurrentPayGateWay(value: IKey['name']): Promise<boolean> {
    try {
      const current = await this.model.findOne({
        prop: 'gateway',
      });
      if (current != null) {
        current.value = value;
        await current.save();
        return true;
      }
      await this.model.create({
        prop: 'gateway',
        value,
      });
      return true;
    } catch (e) {
      logger.error(e);
      return false;
    }
  }
}
