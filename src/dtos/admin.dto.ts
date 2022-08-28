import {IsEmail, IsString, IsEnum, IsOptional} from 'class-validator';
import {Roles} from '../interfaces/admin.interface';

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
export class UpdateAdminDto {
  @IsEmail()
  public oldMail!: string;
  @IsOptional()
  @IsEmail()
  public email!: string;
  @IsOptional()
  @IsString()
  public password!: string;
  @IsOptional()
  @IsString()
  public username!: string;
  @IsOptional()
  @IsEnum(Roles)
  public role!: string;
}
export class ChangeMailDto {
  @IsEmail ()
  public email!: string;
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

export class SendMailDto {
  @IsString()
  public subject!: string;
  @IsString()
  public message!: string;
}
export class SendSingleMailDto {
  @IsString()
  public subject!: string;
  @IsString()
  public message!: string;
  @IsEmail()
  public email!: string;
}export class DeleteNotifDto {
  @IsString()
  public id!: string;
}



export class SendNotificationDto {
  @IsString()
  public title!: string;
  @IsString()
  public message!: string;
}
export class DeleteAdminDto {
  @IsString()
  public email!: string;
}
