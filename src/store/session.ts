import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import type { Session } from "@supabase/supabase-js";

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState = {
  isLoaded: false,
  session: null,
} as State;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

export const useSession = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};

export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore((store) => store.isLoaded);
  return isSessionLoaded;
};

export const useSetSession = () => {
  const setSession = useSessionStore((store) => store.actions.setSession);
  return setSession;
};

export function useIsMine(userId: string | null | undefined) {
  const session = useSession();
  const currentUserId = session?.user?.id;

  if (currentUserId) {
    return userId === currentUserId;
  }

  return false;
}
