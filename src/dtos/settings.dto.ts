import {IsEmail, IsString} from 'class-validator';

export class SetKeyDto {
  @IsString()
  public name!: string;
  @IsString()
  public live!: string;
  @IsString()
  public test!: string;
}
export class SetGatewayDto {
  @IsString()
  public name!: string;
}