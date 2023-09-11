import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import NavAction from "./NavAction";
import NavItem from "./NavItem";

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
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-background" />
      <ScrollArea className="w-full flex-1">
        {(await servers).map((server) => (
          <div key={server.id} className="mb-4">
            <NavItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default NavSidebar;
