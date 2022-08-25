import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
} from "class-validator";

export class CreatePlanDto {
  @IsString()
  public name!: string;

  @IsString()
  public description!: string;
  @IsNumber()
  public price!: number;
  @IsNumber()
  public spaces!: number;
  
}

export class UpdatePlanDto {
  @IsString()
  public name!: string;
  @IsString()
  public id!: string;
  @IsString()
  public description!: string;
  @IsNumber()
  public price!: number;
  @IsNumber()
  public spaces!: number;
}

export class DeletePlanDto {
  @IsString()
  public id!: string;
}
