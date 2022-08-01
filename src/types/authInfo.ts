import { Token } from '../services/token';

export type AuthInfoType = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: Token,
}
