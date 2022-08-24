import { model, Schema } from "mongoose";
import { IToken } from "../interfaces/token.interface";
import moment from 'moment'
import { ITransaction } from "../interfaces/transactions.interface";

const transactionSchema: Schema = new Schema<ITransaction>({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
    type:Date,
    default:()=>moment().toDate()
    },
    status:{
        type:String,
        required:true
    }
});

const transactionModel = model<Document & ITransaction>("transactions", transactionSchema);
export default transactionModel