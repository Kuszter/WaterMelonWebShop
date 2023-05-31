export interface User {
    id?: string;
    userName: string;
    email: string;
    passwordHash?: string; // Opcionális tulajdonság
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
    provider?: string;
    providerUserId?: string;
  }
  