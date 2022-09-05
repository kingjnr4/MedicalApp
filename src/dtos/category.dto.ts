import { IsOptional, IsString } from "class-validator";

export class CreateCatDto {
  @IsString()
  public name!: string;
  @IsString()
  @IsOptional()
  public parent?: string;
}