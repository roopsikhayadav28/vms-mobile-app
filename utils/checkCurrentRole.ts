import {UserRole} from '../generated/hooks_and_more'

export function checkCurrentRole(
  userRole: UserRole,
  loggedInUserRole: UserRole,
): boolean {
  return loggedInUserRole === userRole
}
