import 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string;
    gender?: string;
    birthday?: string;
    height?: number;
    weight?: number;
  }

  interface Session {
    user: User & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    gender?: string;
    birthday?: string;
    height?: number;
    weight?: number;
  }
}
