import { RoleEnum } from '../enums/role.enum';

export interface ICreateUserDto {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  telephone: string;
  role: RoleEnum;
}
