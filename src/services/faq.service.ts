import {CreateFaqDto, DeleteFaqDto, UpdateFaqDto} from '../dtos/faq.dto';
import faqModel from '../models/faq.model';

class FaqService {
  public model = faqModel;

  public async create(data: CreateFaqDto) {
    const created = this.model.create({...data});
    if (created) {
      return true;
    }
    return false;
  }

  public async update(data: UpdateFaqDto) {
    const update = await this.model.findById(data.id);
    
    if (update) {
      update.question = data.question;
      update.answer = data.answer;
      await update.save();
      return true;
    }
    return false;
  }
  public async delete(data: DeleteFaqDto) {
    const gone = await this.model.findByIdAndDelete(data.id);
    if (gone) {
      return true;
    }
    return false;
  }
  public async get() {
    const all = await this.model.find();
    let result = [];
    for (let i = 0; i < all.length; i++) {
      const faq = all[i];
      result.push({
        id: faq._id,
        question: faq.question,
        answer: faq.answer,
      });
    }
    return result;
  }
}
export default FaqService;
