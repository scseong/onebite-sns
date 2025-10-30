import { useEffect, type PropsWithChildren } from "react";
import GlobalLoader from "@/components/global-loader";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import useProfileData from "@/hooks/queries/use-profile-data";
import supabase from "@/lib/supabase";

export default function SessionProvider({ children }: PropsWithChildren) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
