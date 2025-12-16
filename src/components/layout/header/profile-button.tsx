import { Link } from "react-router";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useSession } from "@/store/session";
import useProfileData from "@/hooks/queries/use-profile-data";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { signOut } from "@/api/auth";

export default function ProfileButton() {
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  return (
    <Popover>
      <PopoverTrigger>
        <img
          className="h-6 w-6 cursor-pointer rounded-full object-cover"
          src={profile?.avatar_url || defaultAvatar}
          alt="사용자 프로필 이미지"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session?.user.id}`}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
              프로필
            </div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <div
            className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
            onClick={signOut}
          >
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
