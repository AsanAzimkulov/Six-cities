import { AuthInfoType } from '../../types/authInfo';
import { AuthorizationStatus } from '../../types/const';

export type UserSliceState = {
  user: AuthInfoType | null,
  authorizationStatus: AuthorizationStatus,
}
