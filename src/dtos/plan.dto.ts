import { IsEmail, IsString, IsNotEmpty, IsNumberString, IsNumber } from "class-validator";

export class CreatePlanDto {
  @IsString()
  public name!: string;

  @IsString()
  public description!: string;
  @IsNumber()
  public amount!: number;
  @IsNumber()
  public spaces!: number;
}

