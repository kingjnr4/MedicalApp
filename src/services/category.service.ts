import { CreateCatDto } from '../dtos/category.dto';
import catModel from '../models/category.model';
class CategoryService {
  private model = catModel;
  public async createWithParent(data: CreateCatDto) {
    const created = await this.model.create({...data});
    if (created) {
      return true;
    }
    return false;
  }
  public async createWithoutParent(name: string) {
    const created = await this.model.create({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async exist(name: string) {
    const created = await this.model.find({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async get (){
    const all = await this.model.find();
    const results = []
    for (let i = 0; i < all.length; i++) {
        const cat = all[i];
        results.push ({
            "name":cat.name,
            "parent":cat.parent||''
        })
    }
    return results
  }
}
export default CategoryService