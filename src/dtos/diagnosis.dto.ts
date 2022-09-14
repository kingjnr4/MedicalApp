import { IsString, IsNumber } from "class-validator";

export class CreateAntibioticDto {
  @IsString()
  public category!: string;

  @IsString()
  public name!: string;
  @IsString()
  public withoutPenicillin!: string;
  @IsString()
  public withPenicillin!: string;
}

export class CreateClinicalDto {
  @IsString()
  public category!: string;

  @IsString()
  public disease!: string;
  @IsString()
  public guide!: string;
}
export class UpdateClinicalDto {
  @IsString()
  public id!: string;
  @IsString()
  public category!: string;

  @IsString()
  public disease!: string;
  @IsString()
  public guide!: string;
}
export class DeleteClinicalDto {
  @IsString()
  public id!: string;}

export class UpdateAntibioticDto {
  @IsString()
  public id!: string;
  @IsString()
  public category!: string;

  @IsString()
  public name!: string;
  @IsString()
  public withoutPenicillin!: string;
  @IsString()
  public withPenicillin!: string;
}


export class DeleteAntibioticDto {
  @IsString()
  public id!: string;
}
export class SearchDto {
  @IsString()
  public name!: string;
}