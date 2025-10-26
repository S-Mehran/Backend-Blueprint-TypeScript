import { IsString, IsEmail, IsOptional, IsEnum } from "class-validator";

enum userRoles {
  ADMIN = "admin",
  PATIENT = "patient",
  DOCTOR = "doctor",
}
export class UserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(userRoles, { message: "Role must be one of: admin, patient, doctor" })
  role: userRoles;
}