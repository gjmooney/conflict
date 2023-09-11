"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../ActionTooltip";

interface NavActionProps {}

const NavAction = ({}: NavActionProps) => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button className="group flex items-center">
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500">
            <Plus
              className="text-emerald-500 transition-all group-hover:text-muted"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavAction;
