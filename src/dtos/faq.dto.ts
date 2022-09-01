import {IsString} from 'class-validator';

export class CreateFaqDto {
  @IsString()
  public question!: string;
  @IsString()
  public answer!: string;
}

export class UpdateFaqDto {
  @IsString()
  public id!: string;
  @IsString()
  public question!: string;
  @IsString()
  public answer!: string;
}

export class DeleteFaqDto {
  @IsString()
  public id!: string;
}
