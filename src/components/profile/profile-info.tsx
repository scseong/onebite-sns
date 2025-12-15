import useProfileData from "@/hooks/queries/use-profile-data";
import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import defaultAvatar from "@/assets/default-avatar.jpg";

export default function ProfileInfo({ userId }: { userId: string }) {
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending,
  } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />;
  if (isFetchingProfilePending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        className="h-30 w-30 rounded-full object-cover"
        src={profile.avatar_url || defaultAvatar}
        alt={`${profile.nickname}의 프로필 이미지`}
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
    </div>
  );
}
