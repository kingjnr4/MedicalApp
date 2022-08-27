import {model, Schema} from 'mongoose';
import {IBlock} from '../interfaces/block.interface';


const blockSchema:Schema = new Schema<IBlock> ({
    user:{
      type:Schema.Types.ObjectId,
      required:true
    },
    reason:{
      type:String,
      required:true
    }
  }
)
const blockModel = model<Document & IBlock>('cards', blockSchema);
export default blockModel;
