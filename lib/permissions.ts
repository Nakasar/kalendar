export function userHasPermissions(
  user: { isAdmin: boolean; permissions: string[] } | undefined | null,
  permission: string,
) {
  return user && (user.isAdmin || user.permissions?.includes(permission));
}
