import {IUserIdentity} from './IUserIdentity';

export interface ILoginResult {
  identity: IUserIdentity;
  token: string;
}
