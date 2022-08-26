import { IsEmail, IsString, IsOptional, IsJWT,IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
  @IsString()
  public username!: string;
  @IsString()
  @IsOptional()
  public subscription?: string;
}
export class UpdateUserDto {
  @IsString()
  public firstname!: string;
  @IsString()
  public lastname!: string;
  @IsPhoneNumber()
  public number?: string;
}

export class GenLinkDto {
  @IsEmail()
  public email!: string;

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
export class ChangePassDto {
  @IsString()
  public key!: string;
  @IsString()
  public password!: string;
}
export class BlockUserDto {
  @IsEmail ()
  public email!: string;
}