import { useEffect } from "react";
import useAuth from "../useAuth";

export default function useRoles() {
  const { getCurrentUser, userHasRoles } = useAuth();
  const user = getCurrentUser();

  useEffect(() => {}, [user?.id]);

  return { userHasRoles };
}
