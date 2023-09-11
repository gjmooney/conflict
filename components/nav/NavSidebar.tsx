import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavAction from "./NavAction";

interface NavSidebarProps {}

const NavSidebar = async ({}: NavSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 bg-muted py-3 text-muted-foreground">
      <NavAction />
    </div>
  );
};

export default NavSidebar;
