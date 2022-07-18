import { ISession } from "../interfaces/sessions.interface"
import sessionModel from "../models/session.model"

export const alreadLoggedIn = async (userid:string,) => {
   const sessionsWithId:ISession|null = await sessionModel.findOne({userid})
   if(sessionsWithId !== null){
       return true
   }
   return false;
}