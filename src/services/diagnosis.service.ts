import {CreateAntibioticDto, CreateClinicalDto, UpdateAntibioticDto, UpdateClinicalDto} from '../dtos/diagnosis.dto';
import antibioticModel from '../models/antibioticguide.model';
import clinicalModel from '../models/clinicalguide.model';

class DiagnosisService {
  private model = clinicalModel;
  private aModel = antibioticModel;
  public async createClinical(data: CreateClinicalDto) {
    const created = await this.model.create({...data});
    if (created) {
      return true;
    }
    return false;
  }
  public async createAntibiotic(data: CreateAntibioticDto) {
    const created = await this.aModel.create({...data});
    if (created) {
      return true;
    }
    return false;
  }
  public async existsAntibiotic(name: string) {
    const exists = await this.aModel.findOne({name});
    if (exists) {
      return true;
    }
    return false;
  }
  public async antibioticNameIsDup(name: string, id: string) {
    const exists = await this.aModel.findOne({name});
    if (exists) {
      return exists._id.toString() == id ? false : true;
    }
    return false;
  }
  public async clinicalNameIsDup(disease: string, id: string) {
    const exists = await this.model.findOne({disease});
    if (exists) {
      return exists._id.toString() == id ? false : true;
    }
    return false;
  }
  public async existsClinical(disease: string) {
    const exists = await this.model.findOne({disease});
    if (exists) {
      return true;
    }
    return false;
  }
  public async existsAntibioticId(id: string) {
    const exists = await this.aModel.findById(id);
    if (exists) {
      return true;
    }
    return false;
  }
  public async existsAClinicalId(id: string) {
    const exists = await this.model.findById(id);
    if (exists) {
      return true;
    }
    return false;
  }
  public async updateClinicalCategory(id: string, category: string) {
    const updated = await this.model.findByIdAndUpdate(id, {category});
    if (updated) {
      return true;
    }
    return false;
  }
  public async updateAntibioticCategory(id: string, category: string) {
    const updated = await this.aModel.findByIdAndUpdate(id, {category});
    if (updated) {
      return true;
    }
    return false;
  }
  public async deleteClinicalGuide(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (deleted) {
      return true;
    }
    return false;
  }
  public async deleteAntibioticGuide(id: string) {
    const deleted = await this.aModel.findByIdAndDelete(id);
    if (deleted) {
      return true;
    }
    return false;
  }
  public async updateClinicalGuide(data: UpdateClinicalDto) {
    const update = {
      category: data.category || undefined,
      disease: data.disease || undefined,
      guide: data.guide || undefined,
    };
    const deleted = await this.model.findByIdAndUpdate(data.id, {...update});
    if (deleted) {
      return true;
    }
    return false;
  }
  public async updateAntibioticGuide(data: UpdateAntibioticDto) {
    const update = {
      category: data.category || undefined,
      name: data.name || undefined,
      withPenicillin: data.withPenicillin || undefined,
      withoutPenicillin: data.withoutPenicillin || undefined,
    };
    const deleted = await this.aModel.findByIdAndUpdate(data.id, {...update});
    if (deleted) {
      return true;
    }
    return false;
  }
  public async getClinical() {
    const all = await this.model.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const clinical = all[i];
      results.push({
        id: clinical._id,
        disease: clinical.disease,
        guide: clinical.guide,
        category: clinical.category,
      });
    }
    return results;
  }
  public async getAntibiotic() {
    const all = await this.aModel.find();
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const clinical = all[i];
      results.push({
        id: clinical._id,
        name: clinical.name,
        withPenicillin: clinical.withPenicillin,
        withoutPenicillin: clinical.withoutPenicillin,
        category: clinical.category,
      });
    }
    return results;
  }
  public async getClinicalById(id:string) {
    const clinical = await this.model.findById(id);
     if (clinical == null) {
       return null;
     }
    return {
      id: clinical._id,
      disease: clinical.disease,
      guide: clinical.guide,
      category: clinical.category,
    };
  }
  
  public async getAntibioticById(id:string) {
    const clinical = await this.aModel.findById(id);
    if (clinical == null) {
   return null
    }
    return {
      id: clinical._id,
      name: clinical.name,
      withPenicillin: clinical.withPenicillin,
      withoutPenicillin: clinical.withoutPenicillin,
      category: clinical.category,
    };
  }
  public async getClinicalChildren(category: string) {
    const all = await this.model.find({category});
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const clinical = all[i];
      results.push({
        id: clinical._id,
        disease: clinical.disease,
        guide: clinical.guide,
        category: clinical.category,
      });
    }
    return results;
  }
  public async getAntibioticChildren(category: string) {
    const all = await this.aModel.find({category});
    const results = [];
    for (let i = 0; i < all.length; i++) {
      const clinical = all[i];
      results.push({
        id: clinical._id,
        name: clinical.name,
        withPenicillin: clinical.withPenicillin,
        withoutPenicillin: clinical.withoutPenicillin,
        category: clinical.category,
      });
    }
    return results;
  }
}

export default DiagnosisService;
