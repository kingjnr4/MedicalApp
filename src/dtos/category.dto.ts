import {IsOptional, IsString} from 'class-validator';

export class CreateCatDto {
  @IsString()
  public name!: string;
  @IsString()
  @IsOptional()
  public parent?: string;
}

export class UpdateCatDto {
  @IsString()
  public id!: string;
  @IsString()
  public name!: string;
  @IsString()
  @IsOptional()
  public parent?: string;
}
export class DeleteCatDto {
  @IsString()
  public id!: string;
}
