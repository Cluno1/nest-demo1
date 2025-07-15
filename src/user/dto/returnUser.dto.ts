export class ReturnUserDto {
  id?: number; // 允许 undefined
  avatar?: string;
  account?: string;
  name?: string;
  roles?: string[];
  permissions?: string[];
}
