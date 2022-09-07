import {CreateCatDto, UpdateCatDto} from '../dtos/category.dto';
import {UpdateAntibioticDto} from '../dtos/diagnosis.dto';
import antibioticCatModel from '../models/antibioticcat.model';
import antibioticModel from '../models/antibioticguide.model';
import clinicalCatModel from '../models/clinicalcat.model';
import clinicalModel from '../models/clinicalguide.model';
class CategoryService {
  private model = clinicalCatModel;
  private antibioticCatModel = antibioticCatModel;
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
    const created = await this.model.findOne({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async existClinicalId(id: string) {
    const created = await this.model.findById(id);
    if (created) {
      return true;
    }
    return false;
  }
  public async existAntibioticId(id: string) {
    const created = await this.antibioticCatModel.findById(id);
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
        id: cat._id,
        name: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async createWithParentAntibiotic(data: CreateCatDto) {
    const created = await this.antibioticCatModel.create({...data});
    if (created) {
      return true;
    }
    return false;
  }
  public async createWithoutParentAntibiotic(name: string) {
    const created = await this.antibioticCatModel.create({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async existAntibiotic(name: string) {
    const created = await this.antibioticCatModel.findOne({name});
    if (created) {
      return true;
    }
    return false;
  }
  public async getAntibiotic() {
    const all = await this.antibioticCatModel.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        id: cat._id,
        name: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async getAntibioticWithoutChildren() {
    const all = await this.antibioticCatModel.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      if (await this.hasChildrenAntibiotic(cat.name)) {
        continue;
      }

      results.push({
        id: cat._id,
        name: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async getClinicalWithoutChildren() {
    const all = await this.model.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      if (await this.hasChildrenClinical(cat.name)) {
        continue;
      }

      results.push({
        id: cat._id,
        name: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async hasChildrenClinical(name: string) {
    const count = await this.model.count({parent: name});
    return count > 0;
  }
  public async hasChildrenAntibiotic(name: string) {
    const count = await this.antibioticCatModel.count({parent: name});
    return count > 0;
  }
  public async deleteAntibiotic(id: string) {
    const deleted = this.antibioticCatModel.findByIdAndDelete(id);
    if (deleted) {
      return true;
    }
    return false;
  }
  public async deleteClinical(id: string) {
    const deleted = this.model.findByIdAndDelete(id);
    if (deleted) {
      return true;
    }
    return false;
  }
  public async updateClinical(data: UpdateCatDto) {
    const clinical = await this.model.findById(data.id);
    const oldname = clinical.name;
    const upd = {
      name: data.name,
      parent: data.parent,
    };
    const updated = await clinical.update(upd);
    if (updated) {
      await this.model.updateMany({parent: oldname}, {parent: upd.parent});
      await clinicalModel.updateMany(
        {category: oldname},
        {category: upd.parent},
      );
      return true;
    }
    return false;
  }
  public async updateAntibiotic(data: UpdateCatDto) {
    const clinical = await this.antibioticCatModel.findById(data.id);
    const oldname = clinical.name;
    const upd = {
      name: data.name,
      parent: data.parent,
    };
    const updated = await clinical.update(upd);
    if (updated) {
      await this.antibioticCatModel.updateMany(
        {parent: oldname},
        {parent: upd.parent},
      );
      await antibioticModel.updateMany(
        {category: oldname},
        {category: upd.parent},
      );
      return true;
    }
    return false;
  }
}
export default CategoryService;
