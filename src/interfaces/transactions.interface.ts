import mongoose, { Types } from "mongoose";
export interface ITransaction {
    _id:string
    user:Types.ObjectId
    status:'success'|'failed'
    date:Date
    amount:number
}