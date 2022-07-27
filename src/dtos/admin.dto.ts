import {IsEmail, IsString, IsEnum} from 'class-validator';
import { Roles } from '../interfaces/admin.interface';

export class CreateAdminDto {
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
  @IsString()
  public username!: string;

  @IsEnum(Roles)
  public role!: string;
}

export class LoginAdminDto {
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
}
export class VerifyAdminDto {
  @IsString()
  public key!: string;
}
