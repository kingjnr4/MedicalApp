import { IsEmail, IsString, IsNotEmpty, isJWT } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email!: string;
  
  @IsString()
  public password!: string;
   @IsString()
  public username!: string;
}

export class LoginUserDto {
  @IsEmail()
  public email!: string;
  
  @IsString()
  public password!: string;
}
export class VerifyUserDto {
  @IsString()
  public key!: string;
}
export class BlockUserDto {
  @isJWT()
  public token!: string;
}