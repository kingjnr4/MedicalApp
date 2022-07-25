import { model, Schema } from "mongoose";
import { IToken } from "../interfaces/token.interface";
import moment from 'moment'
import crypto from 'crypto';

const tokenSchema: Schema = new Schema<IToken>({
    key:{
        type:String,
        required:true,
        default:crypto.randomBytes(16).toString('hex'),
    },
    userId:{
        type:String,
        required:true
    },
    expires:{
    type:Date,
    default:()=>moment().add(30,'h').toDate()
    }
});

const tokenModel = model<Document & IToken>("tokens", tokenSchema);
export default tokenModel