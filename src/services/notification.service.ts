import { IUser } from "../interfaces/user.interface";
import notifModel from "../models/notification.model";

class NotifService {
  public model = notifModel;
  public async createNotification(user: IUser, title: string, message: string) {
    const notif = await notifModel.create({user: user._id, title, message});
    if (notif) {
      return true;
    }
    return false;
  }
  public async getAllNotification(user: IUser) {
    const notifs = await notifModel.find({user: user._id});
    const result  = []
    if (notifs) {
     for (let i = 0; i < notifs.length; i++) {
      const notif = notifs[i];
      result.push({
        title: notif.title,
        message:notif.message
      })
     }
    }
    return result
  }
}

  export default NotifService