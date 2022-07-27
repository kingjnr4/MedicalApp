import {IsEmail, IsString} from 'class-validator';

export class SetKeyDto {
  @IsString()
  public name!: string;
  @IsString()
  public public!: string;
  @IsString()
  public secret!: string;
}
export class SetGatewayDto {
  @IsString()
  public name!: string;
}