import { IsEmail, IsString, IsNotEmpty, isJWT } from "class-validator";

export class CreateAdminDto {
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
  @IsString()
  public username!: string;
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
