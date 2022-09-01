import { Router } from "express";
import { IRoute } from "../interfaces/routes.interfaces";

class FaqRoute implements IRoute {
   public path = '/faq';
    public router  = Router ()
    constructor (){
        this.initializeRoutes()
    }
    private initializeRoutes() {
       this
    }
}

export default FaqRoute