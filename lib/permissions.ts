export function userHasPermissions(
  user:
    | { isAdmin: boolean; permissions: string[]; blocked?: boolean }
    | undefined
    | null,
  permission: string,
) {
  return (
    user &&
    !user.blocked &&
    (user.isAdmin || user.permissions?.includes(permission))
  );
}
