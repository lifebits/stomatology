export interface LoginUser {
   login: string;
   password: string;
}

export interface User {
   account: {
      login: string;
      role: string[];
      password?: string;
   };
   firstName: string;
   lastName: string;
   token: string;
}
