import { User } from "./user.model";
export class UserRegistration {
  user: User = {
    id: null,
    userName: '',
    email: '',
    passwordHash: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    provider: '',
    providerUserId: ''
  };
  password: string = '';
  passwordConfirm: string = '';
  provider: string = '';
  providerUserId: string = '';
}