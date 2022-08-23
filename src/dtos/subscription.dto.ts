import {
  IsEmail,
  IsString,
  IsOptional,
  IsJWT,
  IsPhoneNumber,
} from 'class-validator';

export class CreatSubDto {}

export class AddUserToSubToDto {
  @IsEmail()
  public email!: string;
}

export class AcceptInviteDto {
  @IsString()
  public inviteId!: string;
}