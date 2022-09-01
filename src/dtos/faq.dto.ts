import {IsString} from 'class-validator';

export class CreateFaqDto {
  @IsString()
  public question!: string;
  @IsString()
  public answer!: string;
}
