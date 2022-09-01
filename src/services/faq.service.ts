import { CreateFaqDto } from "../dtos/faq.dto"
import faqModel from "../models/faq.model"

class FaqService {
  public model = faqModel;

  public async create(data: CreateFaqDto) {
    const created = this.model.create({...data});
    if (created) {
      return true;
    }
    return false;
  }

  public async update(data: CreateFaqDto) {
    const created = this.model.create({...data});
    if (created) {
      return true;
    }
    return false;
  }
}
export default FaqService