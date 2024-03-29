import { useContext } from "react";
import { AuthContext } from "../src/contexts/AuthContext";

type User = {
  permissions: string[]
  roles: string[]
}

type VallidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({ user, permissions, roles }: VallidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => user.permissions.includes(permission))

    if (!hasAllPermissions) {
      return false
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => user.roles.includes(role))

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}