
import {model, Schema,Document} from 'mongoose';
import {IToken} from '../interfaces/token.interface';
import {IKey} from '../interfaces/key.interface';
import { IInvite } from '../interfaces/invite.interface';

const inviteSchema: Schema = new Schema<IInvite>({
  subId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

const inviteModel = model<Document & IInvite>('invites', inviteSchema);
export default inviteModel;
