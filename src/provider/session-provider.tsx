import { useEffect, type PropsWithChildren } from "react";
import GlobalLoader from "@/components/global-loader";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import supabase from "@/lib/supabase";

export default function SessionProvider({ children }: PropsWithChildren) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}
