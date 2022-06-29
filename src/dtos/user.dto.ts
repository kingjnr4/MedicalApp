import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public firstname!: string;

  @IsString()
  @IsNotEmpty()
  public lastname!: string;

  @IsString()
  public password!: string;
}
