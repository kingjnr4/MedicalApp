import {IsString} from 'class-validator';

export class CreateSupportDto {
  @IsString()
  public subject!: string;
  @IsString()
  public message!: string;
}
export class ReplySupportDto {
  @IsString()
  public id!: string;
  @IsString()
  public reply!: string;
}
export class OpenSupportDto {
  @IsString()
  public id!: string;
}
