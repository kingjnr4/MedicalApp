import {
  IsEmail,
  IsString,
  IsOptional,
  IsJWT,
  IsPhoneNumber,
} from 'class-validator';

export class CreateSubDto {
  @IsString()
  planId: string;
}

export class AddUserToSubToDto {
  @IsEmail()
  public email!: string;
}

export class AcceptInviteDto {
  @IsString()
  public inviteId!: string;
}