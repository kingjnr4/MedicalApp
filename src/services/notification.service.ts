import { IUser } from "../interfaces/user.interface";
import notifModel from "../models/notification.model";

class NotifService {
  public model = notifModel;
  public async createNotification(
    user: IUser,
    title: string,
    message: string,
    id: string,
    type: string = 'general',
  ) {
    const notif = await notifModel.create({
      user: user._id,
      title,
      message,
      type,
      uuid: id,
    });
    return !!notif;

  }
  public async getAllNotification(user: IUser) {
    const notifs = await notifModel.find({user: user._id});
    const result = [];
    if (notifs) {
      for (let i = 0; i < notifs.length; i++) {
        const notif = notifs[i];
        result.push({
          title: notif.title,
          message: notif.message,
		  type:notif.type
        });
      }
    }
    return result;
  }
  public async getAllNotificationByAdmin() {
    const notifs = await notifModel.find({type:'general'}).distinct('uuid');
    let result = [];
    if (notifs) {
      for (let i = 0; i < notifs.length; i++) {
        const notif = await notifModel.findOne({uuid:notifs[i]});
        console.log(notif
        );
        result.push({
          title: notif.title,
          message: notif.message,
          id:notif.uuid,
		  type:notif.type
        });
      }
    }
    return result;
  }
  public async deleteAll(id: string) {
    const count = await notifModel.count({uuid: id});
    if (count == 0) {
      return false;
    }
    const deleted = await notifModel.deleteMany({uuid: id});
    return deleted.acknowledged;
  }
  public async updateAll(id: string,title,message) {
    const count = await notifModel.count({uuid: id});
    if (count == 0) {
      return false;
    }
    const update = await notifModel.updateMany({uuid: id},{
      title,
      message
    });
    return !!update
  }
}

  export default NotifService
