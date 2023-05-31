export interface User {
  id?: any;
  userName: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  provider: string;
  providerUserId: string;
}