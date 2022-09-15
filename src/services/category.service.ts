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
  public async getClinicalId(id: string) {
    const data = await this.model.findById(id);
    return data;
  }
  public async getAntibioticId(id: string) {
    const data = await this.antibioticCatModel.findById(id);
    return data;
  }
  public async getClinical() {
    const all = await this.model.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        id: cat._id,
        name: cat.name,
        category: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async getClinicalChildren(parent: string) {
    const all = await this.model.find({parent});
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        id: cat._id,
        name: cat.name,
        category: cat.name,
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
        category: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async getAntibioticChildren(parent: string) {
    const all = await this.antibioticCatModel.find({parent});
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        id: cat._id,
        name: cat.name,
        category: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async searchClinical(query: string) {
    const regex = new RegExp(query, 'i');
    const all = await this.model.find({name: regex});
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        id: cat._id,
        name: cat.name,
        category: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async searchAntibiotic(query: string) {
    const regex = new RegExp(query, 'i');
    const all = await this.antibioticCatModel.find({name: regex});
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const cat = all[i];
      results.push({
        id: cat._id,
        name: cat.name,
        category: cat.name,
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
        category: cat.name,
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
        category: cat.name,
        parent: cat.parent || '',
      });
    }
    return results;
  }
  public async hasChildrenClinical(name: string) {
    const count = await this.model.count({parent: name});
    console.log(count);

    return count > 0;
  }
  public async hasChildrenAntibiotic(name: string) {
    const count = await this.antibioticCatModel.count({parent: name});
    return count > 0;
  }
  public async hasGuideClinical(name: string) {
    const count = await clinicalModel.count({category: name});
    console.log(count);

    return count > 0;
  }
  public async hasGuideAntibiotic(name: string) {
    const count = await antibioticModel.count({category: name});
    return count > 0;
  }
  public async deleteAntibiotic(id: string) {
    const valid = await this.antibioticCatModel.findById(id);
    if (valid) {
      const has = await this.hasChildrenAntibiotic(valid.name);
      if (has) {
        const children = await this.antibioticCatModel.find({
          parent: valid.name,
        });
        for (let i = 0; i < children.length; i++) {
          await this.deleteAntibiotic(children[i]._id.toString());
        }
        await valid.remove();
        return true;
      } else {
        await antibioticModel.deleteMany({category: valid.name});
        await valid.remove();
        return true;
      }
    }
    return false;
  }
  public async deleteClinical(id: string) {
    const valid = await this.model.findById(id);
    if (valid) {
      const has = await this.hasChildrenClinical(valid.name);
      if (has) {
        const children = await this.model.find({parent: valid.name});
        for (let i = 0; i < children.length; i++) {
          await this.deleteClinical(children[i]._id.toString());
        }
        await valid.remove();
        return true;
      } else {
        await clinicalModel.deleteMany({category: valid.name});
        await valid.remove();
        return true;
      }
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
      await this.model.updateMany({parent: oldname}, {parent: updated.name});
      await clinicalModel.updateMany(
        {category: oldname},
        {category: updated.name},
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
        {parent: updated.name},
      );
      await antibioticModel.updateMany(
        {category: oldname},
        {category: updated.name},
      );
      return true;
    }
    return false;
  }
  public async clinicalCatNameIsDup(name: string, id: string) {
    const exists = await this.model.findOne({name});
    if (exists) {
      return exists._id.toString() == id ? false : true;
    }
    return false;
  }
  public async antibioticCatNameIsDup(name: string, id: string) {
    const exists = await this.antibioticCatModel.findOne({name});
    if (exists) {
      return exists._id.toString() == id ? false : true;
    }
    return false;
  }
}

export default CategoryService;
