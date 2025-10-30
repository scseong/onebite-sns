import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/store/session";
import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import type { PostgrestError } from "@supabase/supabase-js";

export default function useProfileData(userId?: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    enabled: !!userId,
  });
}
