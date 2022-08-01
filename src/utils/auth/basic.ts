import { AuthorizationStatus } from '../../types/const';

export function isCheckedAuth(status: AuthorizationStatus) {
  return status === AuthorizationStatus.Unknown;
}
