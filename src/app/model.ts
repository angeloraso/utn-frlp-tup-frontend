export interface IUserProfile {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  [key: string]: any;
}

export interface IUser {
  id: string;
  gender: string;
  name: {
      title: string;
      first: string;
      last: string;
  },
  email: string;
}
