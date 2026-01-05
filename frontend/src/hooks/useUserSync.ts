import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { syncUser } from "../lib/api";
import { useEffect } from "react";

const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (
      isSignedIn &&
      user &&
      user.primaryEmailAddress &&
      !isPending &&
      !isSuccess
    ) {
      syncUserMutation({
        id: user.id,
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName || user.firstName || undefined,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, isPending, isSuccess, syncUserMutation]);

  return { isSynced: isSuccess };
};

export default useUserSync;
