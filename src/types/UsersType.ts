import { ReactNode } from "react";

export interface UsersType {
  key:number | string
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  bio: string;
  image_url: string;
  role: string;
  refresh_token: string;
  access_token: string;
  action:ReactNode
}
