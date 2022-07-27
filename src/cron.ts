import  {schedule} from "node-cron";

export class Cron {
 static start(exp:string,func:()=>void) {
    schedule(exp,func);
  }
}