import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import { CreateCatDto } from "../dtos/category.dto";
import { AdminGuard } from "../guards/admin.guard";
import { EmptyJwtGuard } from "../guards/jwtempty.guard";
import { IRoute } from "../interfaces/routes.interfaces";
import validationMiddleware from "../middlewares/validation.middleware";

class CategoryRoute implements IRoute{
    public path = "/categories";
    public router =  Router();
    private controller = new CategoryController ()
    constructor (){
        this.initializeRoutes()
    }
    private initializeRoutes(){
        this.router.post(`${this.path}\create`,EmptyJwtGuard.check,AdminGuard.createInstance,validationMiddleware(CreateCatDto,'body','fields'),this.controller.create)


    }
}

export default CategoryRoute