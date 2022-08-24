import { IUser } from "../interfaces/user.interface"
import transactionModel from "../models/transaction.model"
import UserService from "./user.services"

class TransactionService {
    private model = transactionModel
    public async getAll(){
        let result = []
        const transactions = await this.model.find()
        const uService = new UserService()
        if (transactions !=null ) {
          for ( let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i]
            const user = await uService.findUserById (transaction.user.toString())
            result.push(
                {
                    username:user.username,
                    amount:transaction.amount,
                    date:transaction.date,
                    status:transaction.status
                }
            )
          }
          return result
        }
    }
    public async getTransactionCount(){
        const count = await this.model.count()
        return count
    }
    public async addToTransaction(user:IUser,amount:number,status:string){
        const transaction = await this.model.create({
            user:user._id,
            amount,
            status
        })
        return transaction ? true : false
    }
}

export default TransactionService