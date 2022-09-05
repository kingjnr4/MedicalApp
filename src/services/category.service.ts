import {CreateCatDto} from '../dtos/category.dto';
import antibioticCatModel from '../models/antibioticcat.model';
import clinicalCatModel from '../models/clinicalcat.model';
class CategoryService {
  private model = clinicalCatModel;
  private antibioticModel = antibioticCatModel;
  public async createWithParentClinical(data: CreateCatDto) {
    const created = await this.model.create({...data});
    if (created) {
      return true;
    }
    return false;
  }
  public async createWithoutParentClinical(name: string) {
    const created = await this.model.create({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async existClinical(name: string) {
    const created = await this.model.find({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async getClinical() {
    const all = await this.model.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        name: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async createWithParentAntibiotic(data: CreateCatDto) {
    const created = await this.antibioticModel.create({...data});
    if (created) {
      return true;
    }
    return false;
  }
  public async createWithoutParentAntibiotic(name: string) {
    const created = await this.antibioticModel.create({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async existAntibiotic(name: string) {
    const created = await this.antibioticModel.find({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async getAntibiotic() {
    const all = await this.antibioticModel.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        name: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
}
export default CategoryService;
