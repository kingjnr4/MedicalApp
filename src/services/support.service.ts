import moment from 'moment';
import {CreateSupportDto} from '../dtos/support.dto';
import supportModel from '../models/support.model';

class SupportService {
  private model = supportModel;

  public async create(data: CreateSupportDto, sender: string) {
    const created = await this.model.create({...data, sender});
    if (created) {
      return true;
    }
    return false;
  }
  public async getAll() {
    const all = await this.model.find();
    let results = [];
    for (let i = 0; i < all.length; i++) {
      const support = all[i];
      results.push({
        id:support._id,
        sender: support.sender,
        message: support.message,
        reply: support.reply || '',
        status: support.status,
      });
    }
     return results;
  }
  public async getAllFromUser(sender: string) {
    const all = await this.model.find({sender});
    let results = [];
    for (let i = 0; i < all.length; i++) {
      const support = all[i];
      results.push({
        sender: support.sender,
        message: support.message,
        reply: support.reply || '',
        status: support.status,
      });
     
    }
     return results;
  }
  public async getNewRepliesUser(sender: string) {
    const all = await this.model.find({sender,status:'treated'});
    let results = [];
    for (let i = 0; i < all.length; i++) {
      const support = all[i];
      results.push({
        sender: support.sender,
        message: support.message,
        reply: support.reply || '',
        status: support.status,
      });
     
    }
     return results;
  }

  public async updateReply(id: string, reply: string) {
    const support = await this.model.findById(id);
    if (support) {
      support.reply = reply;
      support.date_closed = moment().toDate();
      support.status = 'treated';
      await support.save();
      return true;
    }
    return false;
  }
  public async updateOpened(id: string) {
    const support = await this.model.findById(id);
    if (support &&  support.status == 'treated') {
      return null;
    }
    if (support) {
      support.status = 'open';
      await support.save();
      return true;
    }
    return false;
  }
}
export default SupportService;
