import { IsEmail, MaxLength, MinLength } from "class-validator"


export class UserDto {
  @MaxLength(30)
  @MinLength(6)
  name:string

  @IsEmail()
  email:string

  password:string
}